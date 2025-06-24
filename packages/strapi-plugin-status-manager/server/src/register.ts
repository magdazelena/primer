import { PLUGIN_ID } from "./pluginId";
import { Core } from "@strapi/strapi";
export default ({ strapi }: { strapi: Core.Strapi }): void => {
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