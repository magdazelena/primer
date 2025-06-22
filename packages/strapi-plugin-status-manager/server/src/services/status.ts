'use strict';
import type { Core } from '@strapi/strapi';
import type {  PluginStatusManagerStatusInput } from '../types/contentTypes';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async find() {
    console.log('Status service: find method called');
    try {
      const result = await strapi.db.query('plugin::primer-status-manager.status').findMany({
        orderBy: { order: 'asc' },
      });
      console.log('Status service: find result:', result);
      return result;
    } catch (error) {
      console.error('Status service: find error:', error);
      throw error;
    }
  },

  async findOne(id: number) {
    console.log('Status service: findOne method called with id:', id);
    try {
      const result = await strapi.db.query('plugin::primer-status-manager.status').findOne({
        where: { id },
      });
      console.log('Status service: findOne result:', result);
      return result;
    } catch (error) {
      console.error('Status service: findOne error:', error);
      throw error;
    }
  },

  async createStatus(data: PluginStatusManagerStatusInput) {
    console.log('Status service: createStatus method called');
    try {
      const result = await strapi.db.query('plugin::primer-status-manager.status').create({
        data: {
          name: data.name,
          published: data.published ?? false,
          order: data.order ?? 0,
        },
      });
      console.log('Status service: createStatus result:', result);
      return result;
    } catch (error) {
      console.error('Status service: createStatus error:', error);
      throw error;
    }
  },

  async findProductsByStatus(statusId: number) {
    return await strapi.db.query('api::product.product').findMany({
      where: { status: statusId },
    });
  },

  async updateProductStatus(productId: number, statusId: number) {
    return await strapi.db.query('api::product.product').update({
      where: { id: productId },
      data: { status: statusId },
    });
  },

  async delete(id: number) {
    return await strapi.db.query('plugin::primer-status-manager.status').delete({
      where: { id },
    });
  },

  async deleteStatus(statusId: number, replacementId?: number) {
    console.log('Status service: deleteStatus method called');
    try {
      // Find status by documentId
      const status = await strapi.db.query('plugin::primer-status-manager.status').findOne({
        where: { documentId: statusId },
      });

      if (!status) {
        throw new Error('Status not found');
      }

      if (replacementId) {
        const replacementStatus = await strapi.db.query('plugin::primer-status-manager.status').findOne({
          where: { documentId: replacementId },
        });

        if (!replacementStatus) {
          throw new Error('Replacement status not found');
        }
      }

      // Delete the status
      await strapi.db.query('plugin::primer-status-manager.status').delete({
        where: { documentId: statusId },
      });

      console.log('Status service: deleteStatus completed successfully');
      return true;
    } catch (error) {
      console.error('Status service: deleteStatus error:', error);
      throw error;
    }
  },
}); 