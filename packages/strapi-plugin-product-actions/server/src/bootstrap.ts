import { permissions } from "./permissions";
import type { Core } from "@strapi/strapi";

const bootstrap = async ({ strapi }: { strapi: Core.Strapi }) => {
  try {
    strapi.admin.services.permission.actionProvider.registerMany(permissions.actions);
    await strapi
      .service("admin::permission")
      .actionProvider.registerMany(permissions.actions);
  } catch (error) {
    strapi.log.error(
      "[primershop-product-actions] Failed to register permissions:",
      error
    );
    throw error;
  }
};

export default bootstrap;
