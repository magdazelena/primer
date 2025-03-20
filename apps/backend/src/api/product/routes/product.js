'use strict';

/**
 * product router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::product.product', {
  config: {
    find: {
      middlewares: ['api::product.product-status-middleware'],
    },
    findOne: {
      middlewares: ['api::product.product-status-middleware'],
    },
  },
});
