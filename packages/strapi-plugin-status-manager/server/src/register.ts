import type { AnyDocument, Middleware as DocumentMiddleware } from "@strapi/types/dist/modules/documents";
import { PLUGIN_ID } from "./pluginId";
import type { Core } from "@strapi/strapi";

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

  try {
    const documents = strapi.documents;
    documents.use((context: DocumentMiddleware.Context, next: () => Promise<number | AnyDocument | AnyDocument[] | { documentId: string; entries: AnyDocument[]; }>) => {
      const uid = context.uid;
      if (!uid.includes('api::')) {
        return next();
      }
      const action = context.action;
      const paramKeys = Object.keys(context.params || {});

      if(!paramKeys.includes('statusName')) {
        return next();
      }
      const desiredStatus = context.params['statusName'];
      console.log(
        "primer-status-manager: documents middleware hit",
        { action, uid, paramsKeys: paramKeys.join(","), desiredStatus: desiredStatus ?? "<none>" }
      );

      return next();
    });
  } catch (e) {
    strapi.log.warn("primer-status-manager: failed to register documents middleware");
    console.error(e);
  }
};
