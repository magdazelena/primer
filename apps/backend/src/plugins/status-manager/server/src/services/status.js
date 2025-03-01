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
});