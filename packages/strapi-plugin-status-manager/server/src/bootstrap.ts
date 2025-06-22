import statusActions from './permissions';

export default async ({ strapi }: { strapi: any } ) => {
  console.log('🚀 ========================================');
  console.log('🚀 Status Manager Server Plugin Bootstrap');
  console.log('🚀 Plugin ID: primer-status-manager');
  console.log('🚀 Strapi instance:', !!strapi);
  console.log('🚀 Database connection:', !!strapi?.db);
  console.log('🚀 Available content types:', Object.keys(strapi?.contentTypes || {}));
  
  // Register permissions for the plugin
  try {
    await strapi
    .service('admin::permission')
    .actionProvider.registerMany(statusActions.actions);
    console.log('✅ Permissions registered successfully');
    
  } catch (error) {
    console.error('❌ Error registering permissions:', error);
  }
  
  // bootstrap phase
  console.log('✅ Bootstrap phase completed');
  console.log('🚀 ========================================');
}; 