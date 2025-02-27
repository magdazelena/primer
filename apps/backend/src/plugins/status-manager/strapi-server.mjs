

'use strict';

import config from './server/src/config';
import contentTypes from './server/src/content-types';
import controllers from './server/src/controllers';
import register from './server/src/register';
import routes from './server/src/routes';

export default () => {
  return {
    register,
    config,
    controllers,
    contentTypes,
    routes,
  };
};