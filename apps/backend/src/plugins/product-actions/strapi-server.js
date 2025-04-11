'use strict';

const controllers = require('./server/controllers/index.js');
const routes = require('./server/routes/product-series.js');
const services = require('./server/services/index.js');

console.log('🚀 Product Actions Plugin Loaded!');

module.exports = () => {
  return {
    register(){},

    controllers,
    routes,
    services,
    bootstrap() {}
  };
};