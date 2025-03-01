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
});
  
module.exports = status;