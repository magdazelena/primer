'use strict';

import { Core } from "@strapi/types";

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async find() {
    return await strapi.documents(
      'plugin::status-manager.status').findMany({ sort: { order: 'asc' } }
    );
  },

  async createStatus(data) {
    try {
      const newStatus = await strapi.documents('plugin::status-manager.status').create( { data });
      return newStatus;
    } catch (error) {
      strapi.log.error("Error creating status:", error);
      throw new Error("Failed to create status");
    }
  },
  async deleteStatus(statusId, replacementId) {
    try {
      if (!statusId) {
        throw new Error("Status not provided.");
      }
      if (replacementId) {
        const replacementStatus = await strapi.db.query('plugin::status-manager.status').findOne({
          where: { documentId: replacementId }
        });
        if (!replacementStatus) {
          throw new Error("Replacement status not found");
        }
        try {
          const relatedProducts = await strapi.db.query('api::product.product').findMany({
            where: { statusName: { documentId: statusId } },
            populate: ['statusName']
          });
          const productsToUpdatePromises = relatedProducts.map(product =>
            strapi.db.query('api::product.product').update({
              where: { id: product.id },
              data: { statusName: replacementStatus }
            })
          );
          await Promise.all(productsToUpdatePromises);
        } catch (error) {
          console.error('Error updating products:', error);
        }
      }

      await strapi.db.query('plugin::status-manager.status').delete({
        where: { documentId: statusId }
      });

      const remainingStatuses = await strapi.entityService.findMany('plugin::status-manager.status', {
        sort: { order: 'asc' },
      });

      await Promise.all(
        remainingStatuses.map((status, index) =>
          strapi.entityService.update('plugin::status-manager.status', status.id, { data: { order: index } })
        )
      );

      return { message: "Status deleted and order updated successfully." };
    } catch (error) {
      strapi.log.error("Error deleting status:", error);
      throw new Error("Failed to delete status.");
    }
  },
});