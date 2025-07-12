import type { Core } from "@strapi/strapi";
/**
 * Fetch the highest SKU from the database
 * @returns The highest SKU or null if no products exist
 */
const fetchHighestSKU = async (strapi: Core.Strapi): Promise<string | null> => {
  const product = await strapi.db.query("api::product.product").findOne({
    select: ["sku"],
    orderBy: {
      sku: "desc",
    },
  });
  return product?.sku ?? null;
};

const generateSKU = (previousSKU: string | null): string => {
  let nextNumber = 10000;
  if (previousSKU) {
    const skuNumber = previousSKU.replace("SKU", "");
    if (isNaN(Number(skuNumber))) {
      throw new Error(`SKU ${previousSKU} is not a number`);
    }
    nextNumber = parseInt(skuNumber, 10) + 1;
  }

  return `SKU${nextNumber}`;
};

const isSKUUnique = async (
  sku: string,
  strapi: Core.Strapi,
): Promise<boolean> => {
  const existingProduct = await strapi.db
    .query("api::product.product")
    .findOne({
      where: { sku },
      select: ["sku"],
    });

  return !existingProduct;
};

export const generateUniqueSKU = async (
  strapi: Core.Strapi,
): Promise<string> => {
  const previousSKU = await fetchHighestSKU(strapi);
  const sku = await generateSKU(previousSKU);
  const isUnique = await isSKUUnique(sku, strapi);
  if (!isUnique) {
    throw new Error(`SKU ${sku} is not unique`);
  }

  return sku;
};
