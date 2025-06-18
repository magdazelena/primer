
import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::product.product', {
  config: {
    find: {
      middlewares: ['api::product.product-status-middleware'],
    },
    findOne: {
      middlewares: ['api::product.product-status-middleware'],
    },
  },
}); 