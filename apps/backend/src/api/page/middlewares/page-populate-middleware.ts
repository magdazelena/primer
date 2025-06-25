import type { Context } from "koa";

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

export default () => {
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
