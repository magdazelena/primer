'use strict';

const productSeriesService = require('../product-series');

describe('Product Series Service', () => {
  let strapi;
  let service;

  beforeAll(async () => {
    strapi = await global.testStrapi;
    service = productSeriesService({ strapi });
  });
  afterAll(async () => {
    await strapi.db.query('api::product-series.product-series').deleteMany({});
    await strapi.db.query('api::product.product').deleteMany({});
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
  await strapi.db.query('api::product-series.product-series').deleteMany({});
  await strapi.db.query('api::product.product').deleteMany({});
});
    it('should create products from series with correct data', async () => {
      const count = 3;
      const products = await service.createProductsFromSeries(testSeries.documentId, count);

      expect(products).toHaveLength(count);
      products.forEach((product, index) => {
        expect(product.name).toBe(`Test Series #${index + 1}`);
        expect(product.slug).toBe(`test-series-${index + 1}`);
        expect(product.description).toStrictEqual([{
          type: 'paragraph',
          children: [
            { type: 'text', text: 'Amazing wooden chair, what a great bargain' }
          ]
        }]);
        expect(product.shortDescription).toBe('Test Short Description');
        expect(product.totalCost).toBe(100);
        expect(product.wholesalePrice).toBe(150);
        expect(product.retailPrice).toBe(200);
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
          slug: 'test-series-1',
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
      testProducts = [10, 20, 30].map((index) => ({
              name: `Update Test Product ${index+1}`,
              slug: `update-test-product-${index+1}`,
              series: {
                set: [testSeries.documentId]
              },
              category: {
                set: [testSeries.category?.documentId]
              },
              creator: {
                set: [testSeries.creator?.documentId]
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
          )
        )
     await strapi.db.query('api::product.product').createMany({ data: testProducts})
    }, 3000);
    afterEach(async () => {
      await strapi.db.query('api::product-series.product-series').deleteMany({});
      await strapi.db.query('api::product.product').deleteMany({});
    });
   
    it('should update specified fields for all products in series', async () => {
      await strapi.db.query('api::product-series.product-series').update({
        where: {
          documentId: testSeries.documentId
        },
        data: {
          totalCost: 100,
          description: [{
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Amazing.' }
            ]
          }]
        }
      })
      const updateData = {
        fieldsToUpdate: ['description', 'totalCost'],
      };

      await service.updateSeriesProducts(testSeries.documentId, updateData);

      // Verify updates
      const updatedProducts = await strapi.db.query('api::product.product').findMany({
        where: {
          series: {
            documentId: testSeries.documentId
          }
        },
        populate: ['series']
      })

        updatedProducts.forEach((product) => {
          expect(product.description).toStrictEqual([{
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Amazing.' }
            ]
          }]);
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

      await expect(service.updateSeriesProducts(testSeries.documentId, updateData)).resolves.toBe(true);
    });
  });
}); 