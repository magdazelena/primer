import type { Core } from "@strapi/strapi";
import type { PluginStatusManagerStatusInput } from "../types/contentTypes";
import { defaultLogger, debugPerformanceAsync } from "../utils/debug";

export const statusService = ({ strapi }: { strapi: Core.Strapi }) => ({
  async find() {
    return debugPerformanceAsync("StatusService.find", async () => {
      defaultLogger.log("Finding all statuses");

      const result = await strapi.db
        .query("plugin::primer-status-manager.status")
        .findMany({
          orderBy: { order: "asc" },
        });

      defaultLogger.log("Found statuses", { count: result.length });
      return result;
    });
  },

  async findOne(id: number) {
    const result = await strapi.db
      .query("plugin::primer-status-manager.status")
      .findOne({
        where: { id },
      });
    return result;
  },

  async createStatus(data: PluginStatusManagerStatusInput) {
    return debugPerformanceAsync("StatusService.createStatus", async () => {
      defaultLogger.log("Creating new status", { data });

      const result = await strapi.db
        .query("plugin::primer-status-manager.status")
        .create({
          data: {
            name: data.name,
            published: data.published ?? false,
            order: data.order ?? 0,
          },
        });

      defaultLogger.log("Status created successfully", {
        id: result.id,
        name: result.name,
      });
      return result;
    });
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
    return strapi.db.query("plugin::primer-status-manager.status").delete({
      where: { id },
    });
  },

  async deleteStatus(statusId: number, replacementId?: number) {
    // Find status by documentId
    const status = await strapi.db
      .query("plugin::primer-status-manager.status")
      .findOne({
        where: { documentId: statusId },
      });

    if (!status) {
      throw new Error("Status not found");
    }

    if (replacementId) {
      const replacementStatus = await strapi.db
        .query("plugin::primer-status-manager.status")
        .findOne({
          where: { documentId: replacementId },
        });

      if (!replacementStatus) {
        throw new Error("Replacement status not found");
      }
    }

    // Delete the status
    await strapi.db.query("plugin::primer-status-manager.status").delete({
      where: { documentId: statusId },
    });

    return true;
  },
});
