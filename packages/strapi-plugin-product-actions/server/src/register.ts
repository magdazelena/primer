import { PLUGIN_ID } from "./pluginId";
import type { Core } from "@strapi/strapi";
export default ({ strapi }: { strapi: Core.Strapi }): void => {
  console.log("🔌 ========================================");
  console.log("🔌 Product Actions Server Plugin Registration");

  // Register permissions
  strapi.admin.services.permission.actionProvider.register({
    section: "plugins",
    displayName: "Product Actions",
    uid: PLUGIN_ID,
    pluginName: PLUGIN_ID,
  });
};
