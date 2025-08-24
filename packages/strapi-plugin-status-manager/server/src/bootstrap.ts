import statusActions from "./permissions";
import logger from "../../logger";

interface StrapiInstance {
  db?: unknown;
  contentTypes?: Record<string, unknown>;
  service: (name: string) => {
    actionProvider: { registerMany: (actions: unknown) => Promise<void> };
  };
}

export const bootstrap = async ({ strapi }: { strapi: StrapiInstance }) => {

  // Register permissions for the plugin
  try {
    logger.log("Registering permissions", {
      actions: statusActions.actions,
    });

    await strapi
      .service("admin::permission")
      .actionProvider.registerMany(statusActions.actions);

    logger.log("Permissions registered successfully");
  } catch (error) {
    logger.error("Failed to register permissions", error);
    throw error; // Re-throw to let Strapi handle the error
  }
};
