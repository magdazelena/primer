import type { Core } from "@strapi/strapi";
import type { PluginStatusManagerStatusInput } from "../types/contentTypes";

export const statusService = ({ strapi }: { strapi: Core.Strapi }) => ({
  async isValidStatus(code: string): Promise<boolean> {
    try {
      const row = await strapi.db
        .query("plugin::primershop-status-manager.status")
        .findOne({ where: { name: code }, select: ["id"] } as unknown as never);
      return !!row;
    } catch {
      return false;
    }
  },

  async getStatusByName(name: string) {
    return strapi.db
      .query("plugin::primershop-status-manager.status")
      .findOne({ where: { name } });
  },

  isStatusEnabledFor(uid: string): boolean {
    return !!strapi.getModel(uid as unknown as never);
  },
  async find() {
    const result = await strapi.db
      .query("plugin::primershop-status-manager.status")
      .findMany({
        orderBy: { order: "asc" },
      });

    return result;
  },

  async findOne(id: number) {
    const result = await strapi.db
      .query("plugin::primershop-status-manager.status")
      .findOne({
        where: { id },
      });
    return result;
  },

  async createStatus(data: PluginStatusManagerStatusInput) {
    const result = await strapi.db
      .query("plugin::primershop-status-manager.status")
      .create({
        data: {
          name: data.name,
          published: data.published ?? false,
          order: data.order ?? 0,
        },
      });

    return result;
  },

  async findProductsByStatus(statusId: number) {
    return strapi.db.query("api::product.product").findMany({
      where: { status: statusId },
    });
  },

  async updateProductStatus(productId: number, statusId: number) {
    return strapi.db.query("api::product.product").update({
      where: { id: productId },
      data: { status: statusId },
    });
  },

  async delete(id: number) {
    return strapi.db.query("plugin::primershop-status-manager.status").delete({
      where: { id },
    });
  },

  async deleteStatus(statusId: number, replacementId?: number) {
    // Find status by documentId
    const status = await strapi.db
      .query("plugin::primershop-status-manager.status")
      .findOne({
        where: { documentId: statusId },
      });

    if (!status) {
      throw new Error("Status not found");
    }

    if (replacementId) {
      const replacementStatus = await strapi.db
        .query("plugin::primershop-status-manager.status")
        .findOne({
          where: { documentId: replacementId },
        });

      if (!replacementStatus) {
        throw new Error("Replacement status not found");
      }
    }

    // Delete the status
    await strapi.db.query("plugin::primershop-status-manager.status").delete({
      where: { documentId: statusId },
    });

    return true;
  },
});
