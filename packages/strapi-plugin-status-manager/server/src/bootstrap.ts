import statusActions from "./permissions";

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
  await strapi
    .service("admin::permission")
    .actionProvider.registerMany(statusActions.actions);

    strapi.db?.lifecycles?.subscribe?.({
      // catch all models
      models: ["*"],
      async afterDelete(event: any) {
        const modelUid = event?.model?.uid;
        const deleted = event?.result;
        const documentId = deleted?.documentId;
        if (!modelUid || !documentId) return;

        await (strapi as any).db
          .query("plugin::primer-status-manager.status-link")
          .deleteMany({ where: { targetUid: modelUid, targetDocumentId: documentId } });
      }
  });
};
