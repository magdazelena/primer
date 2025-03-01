module.exports = async ({ strapi }) => {
  console.log('🔌 Registering Status Manager Plugin...');

  strapi.customFields.register({
    name: 'status',
    plugin: 'status-manager',
    type: 'string',
  });
};
