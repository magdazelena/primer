import { PLUGIN_ID } from "./pluginId";

export default ({ strapi }: { strapi: any }): void => {
  console.log('🔌 ========================================');
  console.log('🔌 Status Manager Server Plugin Registration');

  // Register permissions
  strapi.admin.services.permission.actionProvider.register({
    section: 'plugins',
    displayName: 'Status Manager',
    uid: PLUGIN_ID,
    pluginName: PLUGIN_ID,
  });


}; 