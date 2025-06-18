'use strict';
import bootstrap from './server/src/bootstrap';
import config from './server/src/config/index';
import contentTypes from './server/src/content-types/index';
import controllers from './server/src/controllers/index';
import register from './server/src/register';
import routes from './server/src/routes/index';
import services from './server/src/services/index';

console.log('🚀 Status Manager Plugin Loaded!');

export default () => {
  return {
    register,
    config,
    controllers,
    contentTypes,
    routes,
    services,
    policies() {},
    bootstrap
  };
};