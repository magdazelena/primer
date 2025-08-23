import type { Core } from "@strapi/strapi";
import type { ContentType } from "@strapi/types/dist/uid";
import type { Context } from "koa";

const content = ({ strapi }: { strapi: Core.Strapi }): Core.Controller => ({
  async updateContentStatus(ctx: Context) {
    const { contentTypeId, contentItemId, statusName } = ctx.request.body;
    await strapi.documents(contentTypeId).update({
      documentId: contentItemId,
      data: {
        statusName,
      },
    });

    ctx.send({ message: "Content updated successfully" });
  },
  async getContentStatus(ctx: Context) {
    const query = ctx.request.query;
    const { contentItemId, contentTypeId } = query as Record<string, string>;

    const content = await strapi
      .documents(contentTypeId as unknown as ContentType)
      .findOne({
        documentId: contentItemId,
      });
    ctx.send(content);
  },
});

export { content };
