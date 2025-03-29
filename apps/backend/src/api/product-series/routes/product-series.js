'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::product-series.product-series', {
  routes: [
    {
      method: 'POST',
      path: '/product-series/:id/create-products',
      handler: 'product-series.createProducts',
      config: {
        policies: [],
        auth: false,
      },
    },
    {
      method: 'PUT',
      path: '/product-series/:id/update-products',
      handler: 'product-series.updateProducts',
      config: {
        policies: [],
        auth: false,
      },
    },
  ],
}); 