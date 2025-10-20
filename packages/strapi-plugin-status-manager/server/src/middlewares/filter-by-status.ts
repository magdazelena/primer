import { AnyDocument, Middleware as DocumentMiddleware } from "@strapi/types/dist/modules/documents";
import { errors } from '@strapi/utils';

export default async (context: DocumentMiddleware.Context, next: () => Promise<number | AnyDocument | AnyDocument[] | { documentId: string; entries: AnyDocument[]; }>) => {
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
     if (!isValid) throw new errors.ValidationError(`Invalid status: ${desiredStatus}`);

     const status = await strapi.plugin('primer-status-manager').service('status').getStatusByName(desiredStatus);
     if (!status) {
       throw new errors.ValidationError(`Status not found: ${desiredStatus}`);
     }

     const statusLinks = await strapi.db.query('plugin::primer-status-manager.status-link').findMany({
       where: { 
         targetUid: uid,
         status: status.id 
       },
       select: ['targetDocumentId']
     });

     const allowedDocumentIds = statusLinks.map(link => link.targetDocumentId);
     

      context.params['filters'] = {
        ...context.params['filters'],
        documentId: { $in: allowedDocumentIds }
      };
     

     return next();
  }