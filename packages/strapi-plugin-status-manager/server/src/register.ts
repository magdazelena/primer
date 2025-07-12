import { PLUGIN_ID } from "./pluginId";
import type { Core } from "@strapi/strapi";

export const register = ({ strapi }: { strapi: Core.Strapi }): void => {
  // Register permissions
  strapi.admin.services.permission.actionProvider.register({
    section: "plugins",
    displayName: "Status Manager",
    uid: PLUGIN_ID,
    pluginName: PLUGIN_ID,
  });
};
