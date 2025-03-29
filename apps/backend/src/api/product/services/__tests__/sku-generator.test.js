'use strict';

const skuGenerator = require('../sku-generator');
const { createStrapiInstance } = require('../../../../test/helpers/strapi');
const fs = require('fs');
const path = require('path');

describe('SKU Generator Service', () => {
  let strapi;
  const mockProductName = 'Test Product';
  const mockSKU = 'SKU10001';
  const testDir = path.join(__dirname, '../../../../../test');

  beforeAll(async () => {
    try {
      strapi = await createStrapiInstance();
    } catch (error) {
      console.error('Failed to initialize Strapi:', error);
      throw error;
    }
  }, 30000);

  beforeEach(async () => {
    if (!strapi) {
      console.warn('Strapi instance not available for cleanup');
      return;
    }

    try {
      await strapi.db.query('api::product.product').deleteMany({
        where: { name: mockProductName },
      });
      
      const count = await strapi.db.query('api::product.product').count();
      
      if (count > 0) {
        await strapi.db.query('api::product.product').deleteMany({});
      }
    } catch (error) {
      console.error('Failed to clean up test data:', error);
    }
  }, 10000);

  afterAll(async () => {
    if (strapi) {
      try {
        await strapi.destroy();
      } catch (error) {
        console.error('Failed to destroy Strapi instance:', error);
      }
    }

    if (fs.existsSync(testDir)) {
      try {
        fs.rmSync(testDir, { recursive: true, force: true });
      } catch (error) {
        console.error('Failed to remove test directory:', error);
      }
    }
  }, 30000);

  describe('generateUniqueSKU', () => {
    it('should generate a SKU in the correct format', async () => {
      const count = await strapi.db.query('api::product.product').count();
      expect(count).toBe(0);

      const sku = await skuGenerator.generateUniqueSKU();
      expect(sku).toBe('SKU10000');
      expect(sku).toMatch(/^SKU\d{5}$/);
    }, 10000);

    it('should handle existing SKUs and generate a new one', async () => {
      const count = await strapi.db.query('api::product.product').count();
      expect(count).toBe(0);

      await strapi.db.query('api::product.product').create({
        data: {
          name: mockProductName,
          published: true,
          sku: mockSKU,
        },
      });

      const sku = await skuGenerator.generateUniqueSKU();
      expect(sku).toBe('SKU10002');
    }, 10000);

    it('should throw an error if SKU is not a number', async () => {
      const count = await strapi.db.query('api::product.product').count();
      expect(count).toBe(0);

      const products = Array(11).fill().map((_, index) => ({
        name: `${mockProductName}`,
        published: true,
        sku: 'Kartik',
      }));

      await strapi.db.query('api::product.product').createMany({
        data: products,
      });

      await expect(skuGenerator.generateUniqueSKU()).rejects.toThrow();
    }, 10000);

    it('should handle zero existing products', async () => {
      const count = await strapi.db.query('api::product.product').count();
      expect(count).toBe(0);

      const sku = await skuGenerator.generateUniqueSKU();
      expect(sku).toBe('SKU10000');
    }, 10000);

    it('should handle large number of existing products', async () => {
      const count = await strapi.db.query('api::product.product').count();
      expect(count).toBe(0);

      const mockProductCount = 900;
      const batchSize = 100;
      const mockProducts = Array.from({ length: mockProductCount }, (_, index) => ({
        name: `${mockProductName}_${index}`,
        published: true,
        sku: `SKU${index + 10000}`,
      }));

      for (let i = 0; i < mockProductCount; i += batchSize) {
        const batch = mockProducts.slice(i, i + batchSize);
        await strapi.db.query('api::product.product').createMany({
          data: batch,
        });
      }

      const sku = await skuGenerator.generateUniqueSKU();
      expect(sku).toBe('SKU10900');
    }, 10000);
  });
}); 