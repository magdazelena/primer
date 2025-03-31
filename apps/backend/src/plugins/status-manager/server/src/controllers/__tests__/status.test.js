
describe('Status Controller', () => {
  let strapi;
  let statusController;
  let mockStatus;
  let mockReplacementStatus;
  let mockProduct;

  beforeAll(async () => {
    strapi = await global.testStrapi;
    statusController = strapi.plugin('status-manager').controller('status');
    
    // Create mock statuses
    mockStatus = await strapi.db.query('plugin::status-manager.status').create({
      data: {
        name: 'Test Status',
        published: true,
        order: 1,
      },
    });

    mockReplacementStatus = await strapi.db.query('plugin::status-manager.status').create({
      data: {
        name: 'Replacement Status',
        published: true,
        order: 2,
      },
    });

    // Create a mock product with the test status
    mockProduct = await strapi.db.query('api::product.product').create({
      data: {
        name: 'Test Product',
        statusName: mockStatus,
        published: true,
      },
    });
  });

  afterAll(async () => {
    // Clean up test data
    await strapi.db.query('api::product.product').delete({
      where: { id: mockProduct.id },
    });
    await strapi.db.query('plugin::status-manager.status').delete({
      where: { id: mockStatus.id },
    });
    await strapi.db.query('plugin::status-manager.status').delete({
      where: { id: mockReplacementStatus.id },
    });
    

  });

  describe('find', () => {
    it('should return all statuses', async () => {
      const ctx = {
        send: jest.fn(),
        throw: jest.fn(),
      };

      await statusController.find(ctx);
      expect(ctx.send).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single status', async () => {
      const ctx = {
        params: { id: mockStatus.id },
        send: jest.fn(),
        throw: jest.fn(),
        notFound: jest.fn(),
      };

      await statusController.findOne(ctx);
      expect(ctx.send).toHaveBeenCalledWith(mockStatus);
    });

    it('should return 404 if status not found', async () => {
      const ctx = {
        params: { id: 999999 },
        send: jest.fn(),
        throw: jest.fn(),
        notFound: jest.fn(),
      };

      await statusController.findOne(ctx);
      expect(ctx.notFound).toHaveBeenCalledWith('Status not found');
    });
  });

  describe('create', () => {
    it('should create a new status', async () => {
      const ctx = {
        request: {
          body: {
            name: 'New Status',
            published: false,
          },
        },
        send: jest.fn(),
        badRequest: jest.fn(),
        internalServerError: jest.fn(),
      };

      await statusController.create(ctx);
      expect(ctx.send).toHaveBeenCalled();
    });

    it('should reject non-Latin characters', async () => {
      const ctx = {
        request: {
          body: {
            name: 'Статус 123',
            published: false,
          },
        },
        send: jest.fn(),
        badRequest: jest.fn(),
        internalServerError: jest.fn(),
      };

      await statusController.create(ctx);
      expect(ctx.badRequest).toHaveBeenCalledWith('Status name must contain only Latin characters.');
    });
  });

  describe('reorder', () => {
    it('should reorder statuses', async () => {
      const ctx = {
        request: {
          body: {
            statuses: [
              { id: 1, order: 0 },
              { id: 2, order: 1 },
            ],
          },
        },
        send: jest.fn(),
        badRequest: jest.fn(),
        internalServerError: jest.fn(),
      };

      await statusController.reorder(ctx);
      expect(ctx.send).toHaveBeenCalledWith({ message: 'Order updated successfully' });
    });

    it('should reject invalid data format', async () => {
      const ctx = {
        request: {
          body: {
            statuses: 'not an array',
          },
        },
        send: jest.fn(),
        badRequest: jest.fn(),
        internalServerError: jest.fn(),
      };

      await statusController.reorder(ctx);
      expect(ctx.badRequest).toHaveBeenCalledWith('Invalid data format');
    });
  });

  describe('publish', () => {
    it('should toggle status publication', async () => {
      const ctx = {
        request: {
          params: { id: 1 },
          body: { published: true },
        },
        send: jest.fn(),
        internalServerError: jest.fn(),
      };

      await statusController.publish(ctx);
      expect(ctx.send).toHaveBeenCalledWith({ message: 'Un/published successfully successfully' });
    });
  });

  describe('delete', () => {
    it('should delete a status and update associated products', async () => {
      const ctx = {
        request: {
          body: {
            statusId: mockStatus.documentId,
            replacementId: mockReplacementStatus.documentId,
          },
        },
        send: jest.fn(),
        badRequest: jest.fn(),
        internalServerError: jest.fn(),
      };

      try {
        await statusController.delete(ctx);
        expect(ctx.send).toHaveBeenCalledWith({ message: "Status deleted and order updated successfully." });

        // Verify the product was updated
        const updatedProduct = await strapi.db.query('api::product.product').findOne({
          where: { id: mockProduct.id },
          populate: ['statusName']
        });
        expect(updatedProduct.statusName.name).toBe(mockReplacementStatus.name);
      } catch (error) {
        console.error('Error in delete test:', error);
        throw error;
      }
    });

    it('should require statusId', async () => {
      const ctx = {
        request: {
          body: {
            replacementId: mockReplacementStatus.documentId,
          },
        },
        send: jest.fn(),
        badRequest: jest.fn(),
        internalServerError: jest.fn(),
      };

      await statusController.delete(ctx);
      expect(ctx.badRequest).toHaveBeenCalledWith('Status ID is required.');
    });
  });
}); 