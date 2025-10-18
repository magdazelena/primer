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

  // Enhanced list scoping endpoint for content manager integration
  async findManyWithStatus(ctx: Context) {
    const { uid } = ctx.params as { uid: string };
    if (!strapi.getModel(uid as Schema)) return ctx.notFound("Unknown contentTypeUid");

    const pluginsQuery = (ctx.query?.plugins as Record<string, unknown> | undefined);
    const statusMgr = (pluginsQuery?.["primer-status-manager"] as Record<string, unknown> | undefined);
    const statusParam = (statusMgr?.status as string | undefined) || ((ctx.state as Record<string, unknown>)?.status as string | undefined);
    const statusFilterEnabled = statusParam && statusParam !== 'all';

    const baseQuery = (ctx.query || {}) as Record<string, unknown>;

    // If filtering by status, join through status-link mapping
    if (statusFilterEnabled) {
      try {
        const qb = strapi.db.connection;
        const baseTable = strapi.getModel(uid as Schema)!.collectionName!;
        const linkTable = strapi.getModel("plugin::primer-status-manager.status-link")!.collectionName!;

        // Resolve status name -> id
        const status = await strapi.db.query("plugin::primer-status-manager.status").findOne({ where: { name: statusParam } } as unknown as never);
        if (!status) {
          console.error(`❌ Status not found: ${statusParam}`);
          return ctx.send({ results: [], pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } });
        }

        console.log(`🔍 Filtering ${uid} by status: ${statusParam} (ID: ${status.id})`);

        // Build query with status filtering
        const query = qb(baseTable)
          .select(`${baseTable}.*`)
          .leftJoin({ sl: linkTable }, function () {
            this.on("sl.target_uid", qb.raw("?", uid))
              .andOn("sl.target_document_id", "=", qb.ref(`${baseTable}.document_id`));
          })
          .leftJoin("status_links_status_lnk as slj", "sl.id", "slj.status_link_id")
          .where("slj.status_id", status.id);

        // Apply pagination if present
        const page = Number(baseQuery.page) || 1;
        const pageSize = Number(baseQuery.pageSize) || 10;
        const offset = (page - 1) * pageSize;

        // Get total count
        const totalQuery = qb(baseTable)
          .count(`${baseTable}.document_id as count`)
          .leftJoin({ sl: linkTable }, function () {
            this.on("sl.target_uid", qb.raw("?", uid))
              .andOn("sl.target_document_id", "=", qb.ref(`${baseTable}.document_id`));
          })
          .leftJoin("status_links_status_lnk as slj", "sl.id", "slj.status_link_id")
          .where("slj.status_id", status.id);

        const [rows, totalResult] = await Promise.all([
          query.limit(pageSize).offset(offset),
          totalQuery.first()
        ]);

        const total = Number(totalResult?.count) || 0;
        const pageCount = Math.ceil(total / pageSize);

        return ctx.send({
          results: rows,
          pagination: {
            page,
            pageSize,
            pageCount,
            total
          }
        });
      } catch (error) {
        console.error('❌ Status filtering error:', error);
        return ctx.internalServerError(`Status filtering failed: ${error}`);
      }
    }

    // Fall back to entityService if no status filter
    try {
      const data = await strapi.entityService.findMany(uid as unknown as never, baseQuery as unknown as never);
      return ctx.send(data);
    } catch (error) {
      console.error('❌ Entity service error:', error);
      return ctx.internalServerError(`Query failed: ${error}`);
    }
  },
});


