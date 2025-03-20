const { createStrapiInstance } = require('../../../../test/helpers/strapi');

describe('Global Controller', () => {
  let strapi;
  let globalController;

  beforeAll(async () => {
    strapi = await createStrapiInstance();
    globalController = strapi.controller('api::global.global');
  });

  afterAll(async () => {
    await strapi.destroy();
  });

  describe('find', () => {
    it('should return global data', async () => {
      const ctx = {
        query: {},
      };

      const result = await globalController.find(ctx);
      expect(result).toBeDefined();
      expect(result.data).toBeDefined();
    });
  });

}); 