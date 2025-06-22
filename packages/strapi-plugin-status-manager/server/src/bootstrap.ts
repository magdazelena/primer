export default ({ strapi }: { strapi: any } ) => {
  console.log('🚀 ========================================');
  console.log('🚀 Status Manager Server Plugin Bootstrap');
  console.log('🚀 Plugin ID: primer-status-manager');
  console.log('🚀 Strapi instance:', !!strapi);
  console.log('🚀 Database connection:', !!strapi?.db);
  console.log('🚀 Available content types:', Object.keys(strapi?.contentTypes || {}));
  
  // Register permissions for the plugin
  try {

    // Register specific permissions
    const permissions = [
      'plugin::primer-status-manager.status.find',
      'plugin::primer-status-manager.status.findOne',
      'plugin::primer-status-manager.status.create',
      'plugin::primer-status-manager.status.update',
      'plugin::primer-status-manager.status.delete',
    ];

    permissions.forEach(permission => {
      strapi.admin.services.permission.actionProvider.register({
        section: 'plugins',
        displayName: permission.split('.').pop(),
        uid: permission.toLowerCase().replace('plugin::', ''),
        pluginName: 'primer-status-manager',
      });
    });

    console.log('✅ Permissions registered successfully');
  } catch (error) {
    console.error('❌ Error registering permissions:', error);
  }
  
  // bootstrap phase
  console.log('✅ Bootstrap phase completed');
  console.log('🚀 ========================================');
}; 