'use strict';

module.exports = ({ strapi }) => ({
  async createProductsFromSeries(seriesId, count = 1) {
    
    const series = await strapi.db.query('api::product-series.product-series').findOne({
      where: { documentId: seriesId },
      populate: ['products', 'category', 'creator', 'media', 'coverImage', 'seo']
    });

    if (!series) {
      throw new Error('Series not found');
    }

    const products = [];
    const startIndex = series.products?.length || 0;

    for (let i = 0; i < count; i++) {
      const index = startIndex + i;
      
      // Create product with series data
      const product = await strapi.entityService.create('api::product.product', {
        data: {
          name: `${series.name} #${index + 1}`,
          slug: `${series.slug}-${index + 1}`,
          series: {
            set: [seriesId]
          },
          seriesIndex: index,
          category: {
            set: [series.category?.documentId]
          },
          creator: {
            set: [series.creator?.documentId]
        },
          statusName: null,
          publishedAt: null,
          // Copy all required fields from series
          description: series.description,
          shortDescription: series.shortDescription,
          media: series.media,
          coverImage: series.coverImage,
          seo: series.seo,
          totalCost: series.totalCost,
          wholesalePrice: series.wholesalePrice,
          retailPrice: series.retailPrice
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
}); 