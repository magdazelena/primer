const { createStrapi } = require('@strapi/strapi');
const fs = require('fs');
const path = require('path');

async function createStrapiInstance(): Promise<void> {
  try {
    // Get the correct app directory path
    const appDir = path.join(__dirname, '..', '..', '..');
    
    // Create a dedicated test directory
    const testDir = path.join(appDir, 'test');
    console.log('Creating test directory at:', testDir);
    
    // Clean up any existing test directory
    if (fs.existsSync(testDir)) {
      console.log('Removing existing test directory');
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    
    // Create fresh test directory
    fs.mkdirSync(testDir, { recursive: true });
    console.log('Created fresh test directory');

    // Create a new Strapi instance with test-specific paths
    console.log('Creating Strapi instance...');
    const app = await createStrapi({
      appDir,
      distDir: appDir,
      env: 'test',
      autoReload: false,
      database: {
        client: 'sqlite',
        connection: {
          filename: path.join(testDir, 'test.db'),
        },
        useNullAsDefault: true,
      },
      config: {
        database: {
          client: 'sqlite',
          connection: {
            filename: path.join(testDir, 'test.db'),
          },
          useNullAsDefault: true,
        },
      },
    });

    // Register plugins
    console.log('Loading plugins...');
    await app.load();
    
    console.log('Starting Strapi...');
    await app.start();
    
    console.log('Strapi instance created successfully');
    return app;
  } catch (error) {
    console.error('Failed to create Strapi instance:', error);
    throw error;
  }
}

export {
  createStrapiInstance,
}; 