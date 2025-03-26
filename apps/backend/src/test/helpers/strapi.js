const { createStrapi } = require('@strapi/strapi');
const fs = require('fs');
const path = require('path');

async function createStrapiInstance() {
  // Get the correct app directory path
  const appDir = path.join(__dirname, '..', '..', '..');
  
  // Ensure test database directory exists
  const testDbDir = path.join(appDir, '.tmp');
  if (!fs.existsSync(testDbDir)) {
    fs.mkdirSync(testDbDir, { recursive: true });
  }

  // Create a new Strapi instance
  const app = await createStrapi({
    appDir,
    distDir: appDir,
    env: 'test',
    autoReload: false,
  });

  // Register plugins
  await app.load();
  await app.start();

  return app;
}

module.exports = {
  createStrapiInstance,
}; 