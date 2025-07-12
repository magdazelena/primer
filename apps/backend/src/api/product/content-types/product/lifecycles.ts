import { generateUniqueSKU } from "./sku-generator";
import { Lifecycle } from "@strapi/strapi";
  
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
