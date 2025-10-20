import type { Core } from "@strapi/strapi";
import type { Schema, ContentType } from "@strapi/types/dist/uid";
import type { Context } from "koa";

const content = ({ strapi }: { strapi: Core.Strapi }): Core.Controller => ({
    async getStatusForTarget(ctx: Context) {
    const requestParams  = ctx.request.URL.searchParams;
    const contentTypeUid = requestParams.get('contentTypeUid') as Schema;
    if (!strapi.getModel(contentTypeUid)) return ctx.notFound("Unknown contentTypeUid");

    const contentDocumentId = requestParams.get('contentDocumentId') as string;
    const exists = await strapi.documents(contentTypeUid as ContentType).findOne({
      documentId: contentDocumentId,
    });
    if (!exists) return ctx.notFound("Target document not found");

    const link = await strapi
      .plugin("primer-status-manager")
      .service("statusLink")
      .getForTarget(contentTypeUid as string, contentDocumentId);
    return ctx.send({ status: link?.status ?? null });
  },

  async setStatusForTarget(ctx: Context) {
    const { contentTypeUid, contentDocumentId, statusId } = ctx.request.body as {
      contentTypeUid: Schema;
      contentDocumentId: string;
      statusId: string;
    };

    if (!strapi.getModel(contentTypeUid)) return ctx.notFound("Unknown contentTypeUid");

    const exists = await strapi.documents(contentTypeUid as ContentType).findOne({
      documentId: contentDocumentId,
    });
    if (!exists) return ctx.notFound("Target document not found");

    const link = await strapi
      .plugin("primer-status-manager")
      .service("statusLink")
      .setForTarget(contentTypeUid as string, contentDocumentId, statusId);
    return ctx.send({ status: link.status });
  },
});

export { content };