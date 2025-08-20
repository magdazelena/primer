import type { Core } from "@strapi/strapi";
import type { Context } from "koa";

const content = ({ strapi }: { strapi: Core.Strapi }): Core.Controller => ({
  async updateContentStatus(ctx: Context) {
    const { contentTypeId, contentItemId, statusId } = ctx.request.body;
    await strapi.documents(contentTypeId).update({
      documentId: contentItemId,
      data: {
        statusName: {
          set: [{ documentId: statusId }],
        },
      },
    });

    ctx.send({ message: "Content updated successfully" });
  },
  async getContentStatus(ctx: Context) {
    const query = ctx.request.query;
    const { contentItemId, contentTypeId } = query as Record<string, string>;
    const content = await strapi.documents(contentTypeId).findOne({
      documentId: contentItemId,
      populate: {
        statusName: {
          populate: "*",
        },
      },
    });
    ctx.send(content);
  },
});

export { content };
