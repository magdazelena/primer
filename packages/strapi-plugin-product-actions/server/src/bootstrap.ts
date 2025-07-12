import { permissions } from "./permissions";

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
    await strapi
      .service("admin::permission")
      .actionProvider.registerMany(permissions.actions);
  } catch (error) {
    // Handle error silently or log to proper logging service
  }
};
