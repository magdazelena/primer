import statusActions from "./permissions";
import { defaultLogger, debugLog } from "./utils/debug";

interface StrapiInstance {
  db?: {
    lifecycles?: {
      subscribe?: (opts: any) => void;
    };
    query?: (uid: string) => any;
  };
  contentTypes?: Record<string, unknown>;
  service: (name: string) => {
    actionProvider: { registerMany: (actions: unknown) => Promise<void> };
  };
  use: (middleware: any) => void;
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


  // Register lifecycles for cleanup of status links
  try {
    strapi.db?.lifecycles?.subscribe?.({
      // catch all models
      models: ["*"],
      async afterDelete(event: any) {
        const modelUid = event?.model?.uid;
        const deleted = event?.result;
        const documentId = deleted?.documentId;
        if (!modelUid || !documentId) return;

        // remove status links pointing to this document
        try {
          await (strapi as any).db
            .query("plugin::primer-status-manager.status-link")
            .deleteMany({ where: { targetUid: modelUid, targetDocumentId: documentId } });
        } catch (err) {
          defaultLogger.error("Failed to cleanup status links on delete", err);
        }
      },
    });
  } catch (err) {
    defaultLogger.error("Failed to register lifecycle cleanup for status links", err);
  }
};
