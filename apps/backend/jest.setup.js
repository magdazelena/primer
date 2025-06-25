const fs = require("fs");
const path = require("path");
const {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll,
} = require("@jest/globals");
const { createStrapiInstance } = require("./src/test/helpers/strapi");

// Jest globals
global.describe = describe;
global.it = it;
global.expect = expect;
global.beforeEach = beforeEach;
global.afterEach = afterEach;
global.beforeAll = beforeAll;
global.afterAll = afterAll;

// Set test environment variables
process.env.NODE_ENV = "test";

global.testStrapi;
const testDir = path.join(__dirname, ".tmp/test");

beforeAll(async () => {
  try {
    global.testStrapi = await createStrapiInstance();
  } catch (error) {
    console.error("Failed to initialize Strapi:", error);
    throw error;
  }
}, 30000);

afterAll(async () => {
  if (global.testStrapi) {
    try {
      await global.testStrapi.destroy();
    } catch (error) {
      console.error("Failed to destroy Strapi instance:", error);
    }
  }

  if (fs.existsSync(testDir)) {
    try {
      fs.rmSync(testDir, { recursive: true, force: true });
    } catch (error) {
      console.error("Failed to remove test directory:", error);
    }
  }
}, 30000);
