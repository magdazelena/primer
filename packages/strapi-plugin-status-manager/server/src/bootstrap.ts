import permissions from "./permissions";
import type { Core } from "@strapi/strapi";

const bootstrap = async ({ strapi }: { strapi: Core.Strapi }) => {
    strapi.log.info(
    `[primershop-status-manager] Registering permission actions`
  );
  try {
    await strapi.service('admin::permission').actionProvider.registerMany(permissions);
  } catch (error) {
    strapi.log.error(
      "[primershop-status-manager] Failed to register permissions:",
      error
    );
    throw error;
  }

  // Register lifecycle hooks for status filtering
  strapi.db?.lifecycles?.subscribe?.({
    // catch all models
    models: ["*"],

    async afterDelete(event: {
      model?: { uid: string };
      result?: { documentId: string };
    }) {
      const modelUid = event?.model?.uid;
      const deleted = event?.result;
      const documentId = deleted?.documentId;
      if (!modelUid || !documentId) return;

      await strapi.db
        .query("plugin::primershop-status-manager.status-link")
        .deleteMany({
          where: { targetUid: modelUid, targetDocumentId: documentId },
        });
    },
  });
};

export default bootstrap;
