module.exports = ({ strapi}) =>  ({
  async find() {
    return await strapi.entityService.findMany(
      'plugin::status-manager.status',{ orderBy: { order: 'asc' }} 
    );
  },
  async createStatus(data) {
    try {
      const newStatus = await strapi.entityService.create('plugin::status-manager.status', { data });
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
          select: '*',
          where: { documentId: replacementId}
        });
        await strapi.db.query('api::product.product').update({
          where: { status: { documentId:  statusId } },
          data: { status: replacementStatus },
          populate: { status: true }
        });
      }

      // Delete the status
      await strapi.db.query('plugin::status-manager.status').delete({ where: { documentId: statusId }});

      // Reorder remaining statuses
      const remainingStatuses = await strapi.entityService.findMany('plugin::status-manager.status', {
        orderBy: { order: 'asc' },
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