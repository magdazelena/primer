import type { AnyDocument, Middleware as DocumentMiddleware } from "@strapi/types/dist/modules/documents";
import { errors } from '@strapi/utils';
import { PLUGIN_ID } from "./pluginId";
import type { Core } from "@strapi/strapi";

const { ValidationError, NotFoundError } = errors;

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
    documents.use(async (context: DocumentMiddleware.Context, next: () => Promise<number | AnyDocument | AnyDocument[] | { documentId: string; entries: AnyDocument[]; }>) => {
      const uid = context.uid;
      if (!uid.includes('api::')) {
        return next();
      }
      const paramKeys = Object.keys(context.params || {});

       if(!paramKeys.includes('statusName')) {
         return next();
       }
       const desiredStatus = context.params['statusName'];

       if(!desiredStatus || desiredStatus === 'all') return next();

        const isValid = await strapi.plugin('primer-status-manager').service('status').isValidStatus(desiredStatus);
        if (!isValid) throw new ValidationError(`Invalid status: ${desiredStatus}`);


       const result = await next();

       const status = await strapi.plugin('primer-status-manager').service('status').getStatusByName(desiredStatus);
       if (!status) {
        throw new ValidationError(`Status not found: ${desiredStatus}`);
       }


      const statusLinks = await strapi.db.query('plugin::primer-status-manager.status-link').findMany({
        where: { 
          targetUid: uid,
          status: status.id 
        },
        select: ['targetDocumentId']
      });

      const allowedDocumentIds = new Set(statusLinks.map(link => link.targetDocumentId));

      if (Array.isArray(result)) {
        const filtered = result.filter((doc: AnyDocument) => allowedDocumentIds.has(doc.documentId));
        return filtered;
      } 
      if (result && typeof result === 'object' && 'documentId' in result) {
        if (!allowedDocumentIds.has((result as AnyDocument).documentId)) {
          throw new NotFoundError(`Document not found for status: ${(result as AnyDocument).documentId}`);
        }
      }
      return result;
    });
  } catch (e) {
    strapi.log.warn("primer-status-manager: failed to register documents middleware");
    console.error(e);
  }
};
