import bootstrap from './bootstrap';
import config from './config/index';
import contentTypes from './content-types/index';
import controllers from './controllers/index';
import destroy from './destroy';
import middlewares from './middlewares/index';
import register from './register';
import routes from './routes/index';
import services from './services/index';

export default () => {
  return {
    register,
    config,
    controllers,
    contentTypes,
    routes,
    services,
    middlewares,
    policies() {},
    bootstrap,
    destroy
  };
}; 