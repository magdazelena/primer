'use strict';

const { createCoreService } = require('@strapi/strapi').factories;
const generateUniqueSKU = require('../../product/services/sku-generator');

module.exports = createCoreService('api::product-series.product-series', ({ strapi }) => ({
  async createProductsFromSeries(seriesId, count = 1) {
    const series = await strapi.entityService.findOne('api::product-series.product-series', seriesId, {
      populate: ['products', 'category', 'creator']
    });

    if (!series) {
      throw new Error('Series not found');
    }

    const products = [];
    const startIndex = series.products?.length || 0;

    for (let i = 0; i < count; i++) {
      const index = startIndex + i;
      const sku = await generateUniqueSKU();
      
      // Create product with series data
      const product = await strapi.entityService.create('api::product.product', {
        data: {
          ...series.defaultValues,
          name: `${series.name} #${index + 1}`,
          sku,
          series: seriesId,
          seriesIndex: index,
          category: series.category?.id,
          creator: series.creator?.id,
          statusName: null, // Products start in draft state
          publishedAt: null
        }
      });

      products.push(product);
    }

    return products;
  },

  async updateSeriesProducts(seriesId, updateData) {
    const series = await strapi.entityService.findOne('api::product-series.product-series', seriesId, {
      populate: ['products']
    });

    if (!series) {
      throw new Error('Series not found');
    }

    const updatePromises = series.products.map(product =>
      strapi.entityService.update('api::product.product', product.id, {
        data: {
          ...updateData,
          name: `${updateData.name || series.name} #${product.seriesIndex + 1}`
        }
      })
    );

    await Promise.all(updatePromises);
    return true;
  }
})); 