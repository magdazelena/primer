import { PLUGIN_ID } from "./pluginId";
import type { Core } from "@strapi/strapi";
import addStatusField from "./middlewares/add-status-field";
import filterByStatus from "./middlewares/filter-by-status";
import filterPublished from "./middlewares/filter-published";



export const register = ({ strapi }: { strapi: Core.Strapi }): void => {
  strapi.customFields.register({
    name: "statusName",
    plugin: PLUGIN_ID,
    type: "string",
  });
  // Register permissions
  strapi.admin.services.permission.actionProvider.register({
    section: "plugins",
    displayName: "Status Manager",
    uid: PLUGIN_ID,
    pluginName: PLUGIN_ID,
  });

  strapi.documents.use(filterByStatus);
  strapi.documents.use(addStatusField);
  strapi.documents.use(filterPublished);
};
