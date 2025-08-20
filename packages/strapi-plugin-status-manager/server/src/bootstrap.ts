import statusActions from "./permissions";
import { defaultLogger, debugLog } from "./utils/debug";

interface StrapiInstance {
  db?: unknown;
  contentTypes?: Record<string, unknown>;
  service: (name: string) => {
    actionProvider: { registerMany: (actions: unknown) => Promise<void> };
  };
}

export const bootstrap = async ({ strapi }: { strapi: StrapiInstance }) => {
  // Initialize debugging for the plugin
  debugLog("Bootstrap", "Starting Status Manager Plugin bootstrap");

  // Register permissions for the plugin
  try {
    defaultLogger.log("Registering permissions", {
      actions: statusActions.actions,
    });

    await strapi
      .service("admin::permission")
      .actionProvider.registerMany(statusActions.actions);

    defaultLogger.log("Permissions registered successfully");
    debugLog("Bootstrap", "Status Manager Plugin bootstrap completed");
  } catch (error) {
    defaultLogger.error("Failed to register permissions", error);
    throw error; // Re-throw to let Strapi handle the error
  }
};
