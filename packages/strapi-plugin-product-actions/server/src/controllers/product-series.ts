import type { Context } from "koa";
import type { Core } from "@strapi/strapi";

declare global {
  const strapi: Core.Strapi;
}

export const productSeries = {
  async createProducts(ctx: Context) {
    try {
      const { id } = ctx.params;
      const { count = 1 } = ctx.request.body;

      const products = await strapi
        .plugin("product-actions")
        .service("productSeries")
        .createProductsFromSeries(id, count);

      return { data: products };
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  async updateProducts(ctx: Context) {
    try {
      const { id } = ctx.params;
      const updateData = ctx.request.body;

      await strapi
        .plugin("product-actions")
        .service("productSeries")
        .updateSeriesProducts(id, updateData);

      return { success: true };
    } catch (error) {
      ctx.throw(500, error);
    }
  },
};
