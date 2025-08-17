import type { Core } from "@strapi/strapi";
import type { Context } from "koa";

const productSeries = ({
  strapi,
}: {
  strapi: Core.Strapi;
}): Core.Controller => ({
  async createProducts(ctx: Context) {
    try {
      const { id, count = 1 } = ctx.request.body;

      const products = await strapi
        .plugin("primer-product-actions")
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
        .plugin("primer-product-actions")
        .service("productSeries")
        .updateSeriesProducts(id, updateData);

      return { success: true };
    } catch (error) {
      ctx.throw(500, error);
    }
  },
});
export default productSeries;
