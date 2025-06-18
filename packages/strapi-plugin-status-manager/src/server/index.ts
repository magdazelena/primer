import bootstrap from './bootstrap';
import config from './config';
import contentTypes from './content-types';
import controllers from './controllers';
import register from './register';
import routes from './routes';
import services from './services';

export default () => {
  return {
    register,
    config,
    controllers,
    contentTypes,
    routes,
    services,
    policies() {},
    bootstrap,
  };
}; 