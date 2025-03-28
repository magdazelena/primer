'use strict';

const skuGenerator = require('../sku-generator');
const { createStrapiInstance } = require('../../../../test/helpers/strapi');
const fs = require('fs');
const path = require('path');

describe('SKU Generator Service', () => {
  let strapi;
  const mockProductName = 'Test Product';
  const mockSKU = 'SKU10001';
  const testDbPath = path.join(__dirname, '../../../../../.tmp/data.db');

  // Create Strapi instance once for all tests
  beforeAll(async () => {
    // Ensure we're starting with a clean test database
    if (fs.existsSync(testDbPath)) {
      fs.unlinkSync(testDbPath);
    }
    
    strapi = await createStrapiInstance();
  }, 30000); // 30 second timeout

  // Clean up after each test
  afterEach(async () => {
    // Clean up test data
    await strapi.db.query('api::product.product').deleteMany({
      where: { name: mockProductName },
    });
    
    // Verify cleanup
    const count = await strapi.db.query('api::product.product').count();
    console.log('Products in database after cleanup:', count);
  }, 10000); // 10 second timeout

  // Clean up Strapi instance and test database after all tests
  afterAll(async () => {
    if (strapi) {
      await strapi.destroy();
    }
    // Clean up test database
    if (fs.existsSync(testDbPath)) {
      fs.unlinkSync(testDbPath);
    }
  }, 30000); // 30 second timeout

  describe('generateUniqueSKU', () => {
    it('should generate a SKU in the correct format', async () => {
      // Verify database is empty
      const count = await strapi.db.query('api::product.product').count();
      expect(count).toBe(0);

      const sku = await skuGenerator.generateUniqueSKU();
  

      expect(sku).toBe('SKU10000');
      expect(sku).toMatch(/^SKU\d{5}$/);
    }, 10000); // 10 second timeout

    it('should handle existing SKUs and generate a new one', async () => {
      // Verify database is empty
      const count = await strapi.db.query('api::product.product').count();
      expect(count).toBe(0);
      // Create a product with a known SKU
      await strapi.db.query('api::product.product').create({
        data: {
          name: mockProductName,
          published: true,
          sku: mockSKU,
        },
      });

      const sku = await skuGenerator.generateUniqueSKU();
      expect(sku).toBe('SKU10002');
    }, 10000); // 10 second timeout

    it('should throw an error if SKU is not a number', async () => {
      // Verify database is empty
      const count = await strapi.db.query('api::product.product').count();
      expect(count).toBe(0);

      // Create multiple products with sequential SKUs to force collision
      const products = Array(11).fill().map((_, index) => ({
        name: `${mockProductName}`,
        published: true,
        sku: 'Kartik',
      }));

      await strapi.db.query('api::product.product').createMany({
        data: products,
      });

      await expect(skuGenerator.generateUniqueSKU()).rejects.toThrow();
    }, 10000); // 10 second timeout

    it('should handle zero existing products', async () => {
      // Verify database is empty
      const count = await strapi.db.query('api::product.product').count();
      expect(count).toBe(0);

      const sku = await skuGenerator.generateUniqueSKU();
     
      expect(sku).toBe('SKU10000');
    }, 10000); // 10 second timeout

    it('should handle large number of existing products', async () => {
      // Verify database is empty
      const count = await strapi.db.query('api::product.product').count();
      expect(count).toBe(0);

      const mockProductCount = 900;
      const batchSize = 100; // Process in batches of 100
      const mockProducts = Array.from({ length: mockProductCount }, (_, index) => ({
        name: `${mockProductName}_${index}`,
        published: true,
        sku: `SKU${index + 10000}`,
      }));

      // Create products in batches
      for (let i = 0; i < mockProductCount; i += batchSize) {
        const batch = mockProducts.slice(i, i + batchSize);
        await strapi.db.query('api::product.product').createMany({
          data: batch,
        });
      }

      const sku = await skuGenerator.generateUniqueSKU();
  

      expect(sku).toBe('SKU10900');
    }, 10000); // 10 second timeout
  });
}); 