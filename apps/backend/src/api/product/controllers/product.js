'use strict';

/**
 * product controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const skuGenerator = require('../services/sku-generator');

module.exports = createCoreController('api::product.product', ({ strapi }) => ({
  async create(ctx) {
    // Generate a unique SKU
    const sku = await skuGenerator.generateUniqueSKU();   
    
    // Add the SKU to the request body
    ctx.request.body.data = {
      ...ctx.request.body.data,
      sku,
    };
    
    // Call the default create controller
    const response = await super.create(ctx);
    return response;
  },
}));
