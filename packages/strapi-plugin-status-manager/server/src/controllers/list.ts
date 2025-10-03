import type { Core } from "@strapi/strapi";
import { Schema } from "@strapi/types/dist/uid";
import type { Context } from "koa";

export const list = ({ strapi }: { strapi: Core.Strapi }): Core.Controller => ({

  async statusByIds(ctx: Context) {
    const { uid } = ctx.params as { uid: string };
    const { ids } = ctx.request.body as { ids: string[] };
    if (!Array.isArray(ids) || ids.length === 0) return ctx.send({ results: [] });
    if (!strapi.getModel(uid as Schema)) return ctx.notFound("Unknown contentTypeUid");

    const qb = strapi.db.connection;
    const baseTable = strapi.getModel(uid as Schema)!.collectionName!;
    const linkTable = strapi.getModel("plugin::primer-status-manager.status-link")!.collectionName!;
    const statusTable = strapi.getModel("plugin::primer-status-manager.status")!.collectionName!;

    const rows = await qb(baseTable)
      .select(`${baseTable}.document_id as documentId`, qb.raw(`st.name as statusLabel`))
      .leftJoin({ sl: linkTable }, function () {
        this.on("sl.target_uid", qb.raw("?", uid)).andOn("sl.target_document_id", "=", qb.ref(`${baseTable}.document_id`));
      })
      .leftJoin("status_links_status_lnk as slj", "sl.id", "slj.status_link_id")
      .leftJoin({ st: statusTable }, "slj.status_id", "st.id")
      .whereIn(`${baseTable}.document_id`, ids);

    ctx.send({ results: rows });
  },
});


