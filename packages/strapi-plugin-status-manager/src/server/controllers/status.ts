import type { Core } from '@strapi/strapi';
import { Context } from 'koa';

const status = ({ strapi }: { strapi: Core.Strapi }) => ({
  async find(ctx: Context) {
    try {
      const statuses = await strapi
        .plugin('status-manager')
        .service('status')
        .find();
  
      return ctx.send(statuses);
    } catch (err) {
      ctx.throw(err as string, 500);
    }
  },  async findOne(ctx: Context) {
    try {
      const { id } = ctx.params;
      const status = await strapi.documents('plugin::status-manager.status' as any).findOne(id);
      
      if (!status) {
        return ctx.notFound('Status not found');
      }
      
      return ctx.send(status);
    } catch (err) {
      ctx.throw(err as string, 500);
    }
  },
  async create(ctx: Context) {
    try {
      const { name, published = false } = ctx.request.body;

      // Validate name (only Latin characters)
      if (!/^[a-zA-Z\s]+$/.test(name)) {
        return ctx.badRequest("Status name must contain only Latin characters.");
      }

      // Get the highest current order
      const existingStatuses = await strapi.documents('plugin::status-manager.status' as any).findMany({
        sort: 'desc' ,
        limit: 1
      });

      const maxOrder = existingStatuses.length > 0 ? existingStatuses[0].order : 0;

      // Create status
      const newStatus = await strapi.plugin('status-manager').service('status').createStatus({
        name,
        published,
        order: maxOrder ? maxOrder + 1 : 0, // New status goes at the bottom
      });

      return ctx.send(newStatus);
    } catch (error) {
      ctx.internalServerError(`Error adding status: ${error}`);
    }
  },
  async reorder(ctx: Context) {
    try {
      const { statuses } = ctx.request.body; // Expecting [{id: 1, order: 0}, {id: 2, order: 1}, ...]

      if (!Array.isArray(statuses)) {
        return ctx.badRequest("Invalid data format");
      }

      // Update each status with new order
      await Promise.all(
        statuses.map(({ documentId, order }) =>
          strapi.documents('plugin::status-manager.status' as any ).update({ documentId, data: { order } as any })
        )
      );

      ctx.send({ message: "Order updated successfully" });
    } catch (error) {
      ctx.internalServerError(`Error updating order: ${error}`);
    }
  },
  async publish(ctx) {
    const { id } = ctx.request.params;
    const { published } = ctx.request.body
    try {
      await strapi.db.query("plugin::status-manager.status").update({
        where: { documentId: id },
        data: { published }
      })
      ctx.send({ message: "Un/published successfully successfully" });
    } catch (error) {
      ctx.internalServerError(`Error publishing: ${error}`);
    }
  },
  async delete(ctx: Context) {
    try {
      const { statusId, replacementId } = ctx.request.body;

      if (!statusId) {
        return ctx.badRequest("Status ID is required.");
      }
      const result = await strapi.plugin('status-manager').service('status').deleteStatus(statusId, replacementId);
      
      return ctx.send(result);
    } catch (error) {
      ctx.internalServerError(`Error deleting status: ${error}`);
    }
  },
});
  
export default status; 