'use strict';

const { createStrapiInstance } = require('../../../../../test/helpers/strapi');
const productSeriesService = require('../product-series');

describe('Product Series Service', () => {
  let strapi;
  let service;

  beforeAll(async () => {
    strapi = await createStrapiInstance();
    service = productSeriesService({ strapi });
  });

  afterAll(async () => {
    await strapi.destroy();
  });

  describe('createProductsFromSeries', () => {
    let testSeries;

    beforeEach(async () => {
      // Create a test series
      testSeries = await strapi.documents('api::product-series.product-series').create({
        data: {
          name: 'Test Series',
          slug: 'test-series',
          description: [
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'Amazing wooden chair, what a great bargain' }
              ]
            }
          ],
          shortDescription: 'Test Short Description',
          totalCost: 100,
          wholesalePrice: 150,
          retailPrice: 200,
          media: [],
          coverImage: null,
          seo: {
            metaTitle: 'Test Series',
            metaDescription: 'Test Description',
            keywords: 'test,series',
            metaRobots: 'index,follow',
            structuredData: null,
            metaViewport: 'width=device-width, initial-scale=1',
            canonicalURL: null
          },
          locale: 'en'
        },
        populate: ['products', 'category', 'creator', 'media', 'coverImage', 'seo']
      });
    });

    afterEach(async () => {
      // Clean up test data
      if (testSeries?.id) {
        await strapi.documents('api::product-series.product-series').delete({
          where: { id: testSeries.id }
        });
      }
    });

    it('should create products from series with correct data', async () => {
      const count = 3;
      const products = await service.createProductsFromSeries(testSeries.id, count);

      expect(products).toHaveLength(count);
      products.forEach((product, index) => {
        expect(product.name).toBe(`Test Series #${index + 1}`);
        expect(product.slug).toBe(`test-series-${index + 1}`);
        expect(product.description).toBe('Test Description');
        expect(product.shortDescription).toBe('Test Short Description');
        expect(product.totalCost).toBe(100);
        expect(product.wholesalePrice).toBe(150);
        expect(product.retailPrice).toBe(200);
        expect(product.series).toContainEqual(testSeries.id);
        expect(product.seriesIndex).toBe(index);
      });
    });

    it('should throw error if series not found', async () => {
      await expect(service.createProductsFromSeries('non-existent-id')).rejects.toThrow('Series not found');
    });
  });

  describe('updateSeriesProducts', () => {
    let testSeries;
    let testProducts;

    beforeEach(async () => {
      // Create a test series
      testSeries = await strapi.documents('api::product-series.product-series').create({
        data: {
          name: 'Test Series',
          slug: 'test-series',
          description: [
            {
              type: 'paragraph',
              children: [
                { type: 'text', text: 'Amazing wooden chair, what a great bargain' }
              ]
            }
          ],
          shortDescription: 'Original Short Description',
          totalCost: 100,
          wholesalePrice: 150,
          retailPrice: 200,
          media: [],
          coverImage: null,
          seo: {
            metaTitle: 'Test Series',
            metaDescription: 'Test Description',
            keywords: 'test,series',
            metaRobots: 'index,follow',
            structuredData: null,
            metaViewport: 'width=device-width, initial-scale=1',
            canonicalURL: null
          },
          locale: 'en'
        }
      });

      // Create test products
      testProducts = await Promise.all(
        [1, 2, 3].map((index) =>
          strapi.documents('api::product.product').create({
            data: {
              name: `Test Product ${index}`,
              slug: `test-product-${index}`,
              series: {
                connect: [testSeries.id]
              },
              seriesIndex: index - 1,
              description: [
                {
                  type: 'paragraph',
                  children: [
                    { type: 'text', text: 'Amazing wooden chair, what a great bargain' }
                  ]
                }
              ],
              shortDescription: 'Product Short Description',
              totalCost: 50,
              wholesalePrice: 75,
              retailPrice: 100,
              media: [],
              coverImage: null,
              seo: {
                metaTitle: `Test Product ${index}`,
                metaDescription: 'Product Description',
                keywords: 'test,product',
                metaRobots: 'index,follow',
                structuredData: null,
                metaViewport: 'width=device-width, initial-scale=1',
                canonicalURL: null
              },
              locale: 'en'
            }
          })
        )
      );
    });

    afterEach(async () => {
      // Clean up test data
      if (testProducts?.length) {
        await Promise.all(
          testProducts.map((product) =>
            strapi.documents('api::product.product').delete({
              where: { id: product.id }
            })
          )
        );
      }
      if (testSeries?.id) {
        await strapi.documents('api::product-series.product-series').delete({
          where: { id: testSeries.id }
        });
      }
    });

    it('should update specified fields for all products in series', async () => {
      const updateData = {
        fieldsToUpdate: ['description', 'totalCost'],
      };

      await service.updateSeriesProducts(testSeries.id, updateData);

      // Verify updates
      const updatedProducts = await Promise.all(
        testProducts.map((product) =>
          strapi.documents('api::product.product').findOne({
            where: { id: product.id }
          })
        )
      );

      updatedProducts.forEach((product) => {
        expect(product.description).toBe('Original Description');
        expect(product.totalCost).toBe(100);
        expect(product.shortDescription).toBe('Product Short Description');
        expect(product.wholesalePrice).toBe(75);
        expect(product.retailPrice).toBe(100);
      });
    });

    it('should throw error if series not found', async () => {
      const updateData = {
        fieldsToUpdate: ['description'],
      };

      await expect(service.updateSeriesProducts('non-existent-id', updateData)).rejects.toThrow(
        'Series not found'
      );
    });

    it('should handle updating all available fields', async () => {
      const updateData = {
        fieldsToUpdate: [
          'description',
          'shortDescription',
          'media',
          'coverImage',
          'seo',
          'totalCost',
          'wholesalePrice',
          'retailPrice',
          'category',
          'creator',
        ],
      };

      await expect(service.updateSeriesProducts(testSeries.id, updateData)).resolves.toBe(true);
    });
  });
}); 