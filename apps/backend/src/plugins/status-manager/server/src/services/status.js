module.exports = ({ strapi}) =>  ({
  async find() {
    return await strapi.entityService.findMany(
      'plugin::status-manager.status'
    );
  },
});