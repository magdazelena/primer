import { AnyDocument, Middleware as DocumentMiddleware } from "@strapi/types/dist/modules/documents";

export default async (context: DocumentMiddleware.Context, next: () => Promise<number | AnyDocument | AnyDocument[] | { documentId: string; entries: AnyDocument[]; }>) => {
    const uid = context.uid;
    if (!uid.includes('api::')) {
      return next();
    }

    const result = await next();
    
    let documentIds: string[] = [];
    if (Array.isArray(result)) {
      documentIds = result.map((doc: AnyDocument) => doc.documentId).filter(Boolean);
    } else if (result && typeof result === 'object' && 'documentId' in result) {
      documentIds = [(result as AnyDocument).documentId].filter(Boolean);
    }

    if (documentIds.length === 0) {
      return result;
    }

    try {
      const statusLinks = await strapi.db.query('plugin::primer-status-manager.status-link').findMany({
        populate: {
          status: true
        },
        where: { 
          targetUid: uid,
          targetDocumentId: { $in: documentIds }
        }
      });

      if (Array.isArray(result)) {
        result.forEach((doc: AnyDocument) => {
          doc.statusField = statusLinks.find(link => link.targetDocumentId === doc.documentId)?.status || undefined;
        });
      } 
      if (result && typeof result === 'object') {
        (result as AnyDocument).statusField = statusLinks.find(link => link.targetDocumentId === (result as AnyDocument).documentId)?.status || undefined;
      }

    } catch (error) {
      // If status enrichment fails, just return original result
      console.error('primer-status-manager: status enrichment error', error);
    }

    return result;
  }