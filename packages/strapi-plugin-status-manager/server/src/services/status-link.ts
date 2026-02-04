import type { Core } from "@strapi/strapi";

export const statusLinkService = ({ strapi }: { strapi: Core.Strapi }) => ({
  async getForTarget(targetUid: string, targetDocumentId: string) {
    const link = await strapi.db
      .query("plugin::primershop-status-manager.status-link")
      .findOne({
        where: { targetUid, targetDocumentId },
        populate: { status: true },
      });
    return link ?? null;
  },

  async setForTarget(
    targetUid: string,
    targetDocumentId: string,
    statusDocumentId: string
  ) {
    // Create status link
    await strapi.db
      .query("plugin::primershop-status-manager.status-link")
      .deleteMany({ where: { targetUid, targetDocumentId } });

    const created = await strapi
      .documents("plugin::primershop-status-manager.status-link")
      .create({
        data: {
          targetUid,
          targetDocumentId,
          status: {
            set: statusDocumentId,
          },
        },
      });
    return created;
  },
});
