'use strict';

const config = require('./server/src/config/index.js');
const contentTypes = require('./server/src/content-types/index.js');
const controllers = require('./server/src/controllers/index.js');
const register = require('./server/src/register.js');
const routes = require('./server/src/routes/index.js');
const services = require('./server/src/services/index.js');

console.log('🚀 Status Manager Plugin Loaded!');

module.exports = () => {
  return {
    register,
    config,
    controllers,
    contentTypes,
    routes,
    services,
    bootstrap() {}
  };
};