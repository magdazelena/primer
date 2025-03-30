'use strict';

module.exports = {
 'admin': {
    type: 'admin',
    routes: [
        {
          method: 'POST',
          path: '/product-series/:id/create-products',
          handler: 'productSeries.createProducts',
          config: {
            policies: [],
            auth: {
              type: 'admin',
            },
          },
        },
        {
          method: 'PUT',
          path: '/product-series/:id/update-products',
          handler: 'productSeries.updateProducts',
          config: {
            policies: [],
            auth: {
              type: 'admin',
            },
          },
        },
      ],
 }
}; 