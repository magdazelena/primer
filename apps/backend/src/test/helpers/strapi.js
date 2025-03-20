const { createStrapi } = require('@strapi/strapi');

async function createStrapiInstance() {
  const app = await createStrapi({
    appDir: process.cwd(),
    distDir: process.cwd(),
  });
  
  await app.load();
  await app.start();
  return app;
}

module.exports = {
  createStrapiInstance,
}; 