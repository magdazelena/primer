import type { Context, Next } from "koa";
import type { Core } from "@strapi/strapi";

export default ({ strapi }: { strapi: Core.Strapi }) => {
  return async (ctx: Context, next: Next) => {
    const query = (ctx.query || {}) as Record<string, unknown>;

    const pluginsQuery = (query?.plugins as Record<string, unknown> | undefined);
    const statusMgr = (pluginsQuery?.["primer-status-manager"] as Record<string, unknown> | undefined);
    const statusQuery = statusMgr?.status as string | undefined;
    let resolved = statusQuery || "all"
    console.log('resolved', resolved);  

    ctx.state.status = resolved; // allow "all" to mean opt-out
    await next();
  };
};


