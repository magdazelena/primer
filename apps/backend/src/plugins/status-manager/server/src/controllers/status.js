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
});
  
module.exports = status;