import { PLUGIN_ID } from "./pluginId";
import type { Core } from "@strapi/strapi";

const register = ({ strapi }: { strapi: Core.Strapi }): void => {
  // Register permissions
  strapi.admin.services.permission.actionProvider.register({
    section: "plugins",
    displayName: "Product Actions",
    uid: PLUGIN_ID,
    pluginName: PLUGIN_ID,
  });
};

export default register;