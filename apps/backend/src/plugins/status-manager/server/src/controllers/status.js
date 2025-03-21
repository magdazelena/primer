const status = ({ strapi }) => ({
  async find(ctx) {
    try {
      const statuses = await strapi
        .plugin('status-manager')
        .service('status')
        .find();
  
      return ctx.send(statuses);
    } catch (err) {
      ctx.throw(500, err);
    }
  },  async findOne(ctx) {
    try {
      const { id } = ctx.params;
      const status = await strapi.entityService.findOne('plugin::status-manager.status', id);
      
      if (!status) {
        return ctx.notFound('Status not found');
      }
      
      return ctx.send(status);
    } catch (err) {
      ctx.throw(500, err);
    }
  },
  async create(ctx) {
    try {
      const { name, published = false } = ctx.request.body;

      // Validate name (only Latin characters)
      if (!/^[a-zA-Z\s]+$/.test(name)) {
        return ctx.badRequest("Status name must contain only Latin characters.");
      }

      // Get the highest current order
      const existingStatuses = await strapi.entityService.findMany('plugin::status-manager.status', {
        orderBy: { order: 'desc' },
        limit: 1
      });

      const maxOrder = existingStatuses.length > 0 ? existingStatuses[0].order : 0;

      // Create status
      const newStatus = await strapi.plugin('status-manager').service('status').createStatus({
        name,
        published,
        order: maxOrder + 1, // New status goes at the bottom
      });

      return ctx.send(newStatus);
    } catch (error) {
      ctx.internalServerError("Error adding status", error);
    }
  },
  async reorder(ctx) {
    try {
      const { statuses } = ctx.request.body; // Expecting [{id: 1, order: 0}, {id: 2, order: 1}, ...]

      if (!Array.isArray(statuses)) {
        return ctx.badRequest("Invalid data format");
      }

      // Update each status with new order
      await Promise.all(
        statuses.map(({ id, order }) =>
          strapi.entityService.update('plugin::status-manager.status', id, { data: { order } })
        )
      );

      ctx.send({ message: "Order updated successfully" });
    } catch (error) {
      ctx.internalServerError("Error updating order", error);
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
      ctx.internalServerError("Error publishing", error);
    }
  },
  async delete(ctx) {
    try {
      const { statusId, replacementId } = ctx.request.body;

      if (!statusId) {
        return ctx.badRequest("Status ID is required.");
      }
      const result = await strapi.plugin('status-manager').service('status').deleteStatus(statusId, replacementId);
      
      return ctx.send(result);
    } catch (error) {
      ctx.internalServerError("Error deleting status.", error);
    }
  },
});
  
module.exports = status;