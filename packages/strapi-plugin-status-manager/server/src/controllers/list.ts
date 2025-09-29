import type { Core } from "@strapi/strapi";
import { Schema } from "@strapi/types/dist/uid";
import type { Context } from "koa";

export const list = ({ strapi }: { strapi: Core.Strapi }): Core.Controller => ({
  async listWithStatus(ctx: Context) {
    const { uid } = ctx.params as { uid: string };
    if (!strapi.getModel(uid as Schema)) return ctx.notFound("Unknown contentTypeUid");

    // Query params from CM
    const page = Number(ctx.request.query?.["pagination[page]"] ?? 1);
    const pageSize = Number(ctx.request.query?.["pagination[pageSize]"] ?? 25);
    const sortParam = (ctx.request.query?.sort as string | undefined) ?? "";

    // Parse filters for statusLabel
    const filters = ctx.request.query?.filters as Record<string, any> | undefined;

    // Resolve table names
    const qb = strapi.db.connection;
    const uidMeta = strapi.getModel(uid as Schema)!;
    const baseTable = uidMeta.collectionName!;

    // Plugin tables
    const linkTable = strapi.getModel("plugin::primer-status-manager.status-link")!.collectionName;
    const statusTable = strapi.getModel("plugin::primer-status-manager.status")!.collectionName;

    // Build base query with joins
    let query = qb(baseTable)
      .leftJoin({ sl: linkTable }, function () {
        this.on("sl.target_uid", qb.raw("?", uid)).andOn("sl.target_document_id", "=", qb.ref(`${baseTable}.document_id`));
      })
      .leftJoin("status_links_status_lnk as slj", "sl.id", "slj.status_link_id")
      .leftJoin({ st: statusTable }, "slj.status_id", "st.id");

    // Project base fields + statusLabel. Minimal: id, document_id, and all base columns
    query = query.select(`${baseTable}.id as id`, `${baseTable}.document_id as documentId`, qb.raw(`st.name as statusLabel`), qb.ref(`${baseTable}.*`));

    // Apply statusLabel filters (supports $eq, $in, $containsi minimal)
    const statusFilter = filters?.statusLabel as Record<string, any> | undefined;
    if (statusFilter) {
      if (statusFilter.$eq) {
        query = query.where("st.name", "=", statusFilter.$eq);
      }
      if (statusFilter.$in) {
        query = query.whereIn("st.name", Array.isArray(statusFilter.$in) ? statusFilter.$in : [statusFilter.$in]);
      }
      if (statusFilter.$containsi) {
        query = query.whereILike("st.name", `%${statusFilter.$containsi}%`);
      }
    }

    // Sorting
    if (sortParam) {
      const [field, order] = sortParam.split(":");
      if (field === "statusLabel") {
        query = query.orderBy("st.name", (order as any) === "desc" ? "desc" : "asc");
      } else {
        query = query.orderBy(`${baseTable}.${field}`, (order as any) === "desc" ? "desc" : "asc");
      }
    }

    // Pagination
    const offset = (page - 1) * pageSize;
    const [rows, [{ count }]] = await Promise.all([
      query.clone().offset(offset).limit(pageSize),
      qb(baseTable)
        .leftJoin({ sl: linkTable }, function () {
          this.on("sl.target_uid", qb.raw("?", uid)).andOn("sl.target_document_id", "=", qb.ref(`${baseTable}.document_id`));
        })
        .leftJoin("status_links_status_lnk as slj", "sl.id", "slj.status_link_id")
        .leftJoin({ st: statusTable }, "slj.status_id", "st.id")
        .modify((builder) => {
          // Apply same filter to count
          if (statusFilter) {
            if (statusFilter.$eq) builder.where("st.name", "=", statusFilter.$eq);
            if (statusFilter.$in) builder.whereIn("st.name", Array.isArray(statusFilter.$in) ? statusFilter.$in : [statusFilter.$in]);
            if (statusFilter.$containsi) builder.whereILike("st.name", `%${statusFilter.$containsi}%`);
          }
        })
        .count({ count: "*" }) as any,
    ]);

    ctx.send({
      results: rows,
      pagination: {
        page,
        pageSize,
        pageCount: Math.ceil(Number(count) / pageSize),
        total: Number(count),
      },
    });
  },

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


