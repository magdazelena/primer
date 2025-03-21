const { createStrapi } = require('@strapi/strapi');
const fs = require('fs');
const path = require('path');

async function createStrapiInstance() {
  // Ensure test database directory exists
  const testDbDir = path.join(process.cwd(), '.tmp');
  if (!fs.existsSync(testDbDir)) {
    fs.mkdirSync(testDbDir, { recursive: true });
  }

  // Create a new Strapi instance
  const app = await createStrapi({
    appDir: process.cwd(),
    distDir: process.cwd(),
    env: 'test',
  });

  // Load the application
  await app.load();
  
  // Start the application
  await app.start();

  return app;
}

module.exports = {
  createStrapiInstance,
}; 