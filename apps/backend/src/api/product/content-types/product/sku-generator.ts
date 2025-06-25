interface Product {
  sku?: string;
  toString(): string;
}

const generateSKU = async (): Promise<string> => {
  // Get all SKUs and find the highest number
  const products = (await strapi.db.query("api::product.product").findMany({
    select: ["sku"],
  })) as Product[];

  let nextNumber = 10000;
  if (products.length > 0) {
    const skuNumbers = products.map((p) =>
      parseInt(p.sku?.replace("SKU", "") || "0", 10),
    );
    skuNumbers.forEach((n) => {
      if (Number.isNaN(n)) {
        throw new Error(
          `SKU ${n} is not a number, product: ${products.find((p) => p.sku === n.toString())?.toString()}`,
        );
      }
    });
    if (skuNumbers.length > 0) {
      nextNumber = Math.max(...skuNumbers) + 1;
    }
  }

  return `SKU${nextNumber}`;
};

const isSKUUnique = async (sku: string): Promise<boolean> => {
  const existingProduct = await strapi.db
    .query("api::product.product")
    .findOne({
      where: { sku },
      select: ["sku"],
    });

  return !existingProduct;
};

export const generateUniqueSKU = async (): Promise<string> => {
  let sku = await generateSKU();
  let isUnique = await isSKUUnique(sku);
  let count = 0;
  while (!isUnique) {
    sku = await generateSKU();
    isUnique = await isSKUUnique(sku);
    count += 1;
    if (count > 10) {
      throw new Error("Failed to generate a unique SKU");
    }
  }

  return sku;
};
