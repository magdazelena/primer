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
      const statusToDelete = await strapi.entityService.findOne('plugin::status-manager.status', statusId);

      if (!statusToDelete) {
        throw new Error("Status not found.");
      }

      // If replacement is provided, update references in other collections
      // if (replacementId) {
      //   await strapi.db.query('plugin::status-manager.status').updateMany({
      //     where: { id: statusId },
      //     data: { id: replacementId },
      //   });
      // }

      // Delete the status
      await strapi.entityService.delete('plugin::status-manager.status', statusId);

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