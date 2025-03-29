'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::product-series.product-series', ({ strapi }) => ({
  async createProducts(ctx) {
    try {
      const { id } = ctx.params;
      const { count = 1 } = ctx.request.body;

      const products = await strapi.service('api::product-series.product-series').createProductsFromSeries(id, count);
      
      return { data: products };
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  async updateProducts(ctx) {
    try {
      const { id } = ctx.params;
      const updateData = ctx.request.body;

      await strapi.service('api::product-series.product-series').updateSeriesProducts(id, updateData);
      
      return { success: true };
    } catch (error) {
      ctx.throw(500, error);
    }
  }
})); 