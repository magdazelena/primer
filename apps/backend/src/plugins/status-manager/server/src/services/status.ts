'use strict';
import type { Core } from '@strapi/strapi';
import type {  PluginStatusManagerStatusInput } from '../types/contentTypes';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async find() {
    return await strapi.db.query('plugin::status-manager.status').findMany({
      orderBy: { order: 'asc' },
    });
  },

  async findOne(id: number) {
    return await strapi.db.query('plugin::status-manager.status').findOne({
      where: { id },
    });
  },

  async createStatus(data: PluginStatusManagerStatusInput) {
    return await strapi.db.query('plugin::status-manager.status').create({
      data: {
        name: data.name,
        published: data.published ?? false,
        order: data.order ?? 0,
      },
    });
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
    return await strapi.db.query('plugin::status-manager.status').delete({
      where: { id },
    });
  },

  async deleteStatus(statusId: number, replacementId?: number) {
    const status = await this.findOne(statusId);

    if (!status) {
      throw new Error('Status not found');
    }

    if (replacementId) {
      const replacementStatus = await this.findOne(replacementId);

      if (!replacementStatus) {
        throw new Error('Replacement status not found');
      }

      // Update all products that use this status to use the replacement status
      const products = await this.findProductsByStatus(statusId);

      for (const product of products) {
        await this.updateProductStatus(product.id, replacementId);
      }
    }

    // Delete the status
    await this.delete(statusId);

    return true;
  },
});