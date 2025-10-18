import statusActions from "./permissions";
import type { Core } from "@strapi/strapi";

export const bootstrap = async ({ strapi }: { strapi: Core.Strapi }) => {
  await strapi
    .service("admin::permission")
    .actionProvider.registerMany(statusActions.actions);

  // Register lifecycle hooks for status filtering
  strapi.db?.lifecycles?.subscribe?.({
    // catch all models
    models: ["*"],


    async afterDelete(event: { model?: { uid: string }; result?: { documentId: string } }) {
      const modelUid = event?.model?.uid;
      const deleted = event?.result;
      const documentId = deleted?.documentId;
      if (!modelUid || !documentId) return;

      await strapi.db
        .query("plugin::primer-status-manager.status-link")
        .deleteMany({ where: { targetUid: modelUid, targetDocumentId: documentId } });
    }
  });
};
