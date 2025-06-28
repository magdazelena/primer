import productActions from './permissions';

export default async ({ strapi }: { strapi: any } ) => {
  console.log('🚀 ========================================');
  console.log('🚀 Product Actions Server Plugin Bootstrap');
  console.log('🚀 Plugin ID: primer-product-actions');
  console.log('🚀 Strapi instance:', !!strapi);
  console.log('🚀 Database connection:', !!strapi?.db);
  console.log('🚀 Available content types:', Object.keys(strapi?.contentTypes || {}));
  
  // Register permissions for the plugin
  try {
    await strapi
    .service('admin::permission')
    .actionProvider.registerMany(productActions.actions);
    console.log('✅ Permissions registered successfully');
    
  } catch (error) {
    console.error('❌ Error registering permissions:', error);
  }
  
  // bootstrap phase
  console.log('✅ Bootstrap phase completed');
  console.log('🚀 ========================================');
}; 