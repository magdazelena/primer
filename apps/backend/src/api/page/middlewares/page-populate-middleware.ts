import type { Context } from "koa";
import type { Core } from "@strapi/types";

interface Config {
  // Add config properties if needed
}

interface QueryParams {
  populate?: unknown;
  filters?: {
    slug?: string;
  };
  locale?: string;
}

/**
 * `page-populate-middleware` middleware
 */

module.exports = (config: Config, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx: Context, next: () => Promise<void>): Promise<void> => {
    const query = ctx.query as QueryParams;
    ctx.query = {
      populate: query.populate,
      filters: { slug: query.filters?.slug },
      locale: query.locale,
    };

    await next();
  };
};
