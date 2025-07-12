import type { Core } from "@strapi/strapi";
import type { Context } from "koa";

const status = ({ strapi }: { strapi: Core.Strapi }): Core.Controller => ({
  async listStatuses(ctx: Context) {
    try {
      const statuses = await strapi
        .documents("plugin::primer-status-manager.status")
        .findMany({
          orderBy: { order: "asc" },
        });
      return ctx.send(statuses);
    } catch (err) {
      console.error("❌ Status controller: find error:", err);
      ctx.throw(500, err as string);
    }
  },

  async create(ctx: Context) {
    try {
      const { name, published = false } = ctx.request.body;

      // Validate name (only Latin characters)
      if (!/^[a-zA-Z\s]+$/.test(name)) {
        return ctx.badRequest(
          "Status name must contain only Latin characters.",
        );
      }

      // Get the highest order value
      const existingStatuses = await strapi
        .documents("plugin::primer-status-manager.status")
        .findMany({
          orderBy: { order: "desc" },
          limit: 1,
        });

      const newOrder =
        existingStatuses.length > 0 ? existingStatuses[0].order + 1 : 0;

      // Create status
      const newStatus = await strapi
        .documents("plugin::primer-status-manager.status")
        .create({
          data: {
            name,
            published,
            order: newOrder,
          },
        });

      return ctx.send(newStatus);
    } catch (error) {
      console.error("Status controller: create error:", error);
      ctx.internalServerError(`Error adding status: ${error}`);
    }
  },

  async reorder(ctx: Context) {
    try {
      const { statuses } = ctx.request.body;

      if (!Array.isArray(statuses)) {
        return ctx.badRequest("Invalid data format");
      }

      // Update each status with new order
      await Promise.all(
        statuses.map(({ documentId, order }) =>
          strapi.documents("plugin::primer-status-manager.status").update({
            where: { documentId },
            data: { order },
          }),
        ),
      );

      ctx.send({ message: "Order updated successfully" });
    } catch (error) {
      console.error("Status controller: reorder error:", error);
      ctx.internalServerError(`Error updating order: ${error}`);
    }
  },

  async publish(ctx: Context) {
    try {
      const { id } = ctx.params;
      const { published } = ctx.request.body;

      await strapi.documents("plugin::primer-status-manager.status").update({
        where: { documentId: id },
        data: { published },
      });

      ctx.send({ message: "Status updated successfully" });
    } catch (error) {
      console.error("Status controller: publish error:", error);
      ctx.internalServerError(`Error updating status: ${error}`);
    }
  },

  async delete(ctx: Context) {
    try {
      const { statusId, replacementId } = ctx.request.body;

      if (!statusId) {
        return ctx.badRequest("Status ID is required.");
      }

      // Delete the status
      await strapi.documents("plugin::primer-status-manager.status").delete({
        where: { documentId: statusId },
      });

      return ctx.send({ message: "Status deleted successfully" });
    } catch (error) {
      console.error("Status controller: delete error:", error);
      ctx.internalServerError(`Error deleting status: ${error}`);
    }
  },
});

export default status;
