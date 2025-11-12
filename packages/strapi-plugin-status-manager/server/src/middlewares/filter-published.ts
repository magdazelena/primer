import {
  AnyDocument,
  Middleware as DocumentMiddleware,
} from "@strapi/types/dist/modules/documents";

export default async (
  context: DocumentMiddleware.Context,
  next: () => Promise<
    | number
    | AnyDocument
    | AnyDocument[]
    | { documentId: string; entries: AnyDocument[] }
  >
) => {
  const uid = context.uid;
  if (!uid.includes("api::")) {
    return next();
  }

  const params = context.params;
  if ((!params && !params["status"]) || params["statusName"]) return next();

  const unpublishedStatusLinks = await strapi.db
    .query("plugin::primershop-status-manager.status-link")
    .findMany({
      populate: {
        status: true,
      },
      where: {
        targetUid: uid,
        status: {
          published: false,
        },
      },
      select: ["targetDocumentId"],
    });

  const unpublishedDocumentIds = unpublishedStatusLinks.map(
    (link) => link.targetDocumentId
  );

  context.params["filters"] = {
    ...context.params["filters"],
    documentId: { $notIn: unpublishedDocumentIds },
  };

  return next();
};
