'use strict';

import * as controllers from './server/controllers/index';
import * as routes from './server/routes/product-series';
import * as services from './server/services';

console.log('🚀 Product Actions Plugin Loaded!');

export default () => {
  return {
    register(){},

    controllers,
    routes,
    services,
    bootstrap() {}
  };
};