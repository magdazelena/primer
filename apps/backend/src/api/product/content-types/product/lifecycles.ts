import { generateUniqueSKU } from "./sku-generator";
import type { Core } from "@strapi/strapi";
namespace Lifecycle {
  export type BeforeCreate = {
    params: { data: { sku: string } };
    context: { strapi: Core.Strapi };
  }
  export type BeforeCreateMany = {
    params: { data: { sku: string }[] };
    context: { strapi: Core.Strapi };
  }
};

export default {
  async beforeCreate(event: Lifecycle.BeforeCreate) {
    const { data } = event.params;

    // Generate SKU if not provided
    if (!data.sku) {
      data.sku = await generateUniqueSKU(event.context.strapi);
    }
  },

  async beforeCreateMany(event: Lifecycle.BeforeCreateMany) {
    const { data } = event.params;

    // Handle bulk creation
    if (Array.isArray(data)) {
      for (const item of data) {
        if (!item.sku) {
          item.sku = await generateUniqueSKU(event.context.strapi);
        }
      }
    }
  },
};
