'use strict';

const generateSKU = async () => {
  // Get all SKUs and find the highest number
  const products = await strapi.db.query('api::product.product').findMany({
    select: ['sku'],
  });

  let nextNumber = 10000;
  if (products.length > 0) {
    const skuNumbers = products
      .map(p => parseInt(p.sku?.replace('SKU', '')))
    skuNumbers.forEach(n => {
      if (isNaN(n)) {
        throw new Error(`SKU ${n} is not a number, product: ${products.find(p => p.sku === n).toString()}`);
      }
    })
    if (skuNumbers.length > 0) {
      nextNumber = Math.max(...skuNumbers) + 1;
    }
  }

  return `SKU${nextNumber}`;
};

const isSKUUnique = async (sku) => {
  const existingProduct = await strapi.db.query('api::product.product').findOne({
    where: { sku },
    select: ['sku'],
  });
  
  return !existingProduct;
};

const generateUniqueSKU = async () => {
  let sku = await generateSKU();
  let isUnique = await isSKUUnique(sku);
  let count = 0;
  
  while (!isUnique) {
    sku = await generateSKU();
    isUnique = await isSKUUnique(sku);
    count++;
    if (count > 10) {
      throw new Error('Failed to generate a unique SKU');
    }
  }
  
  return sku;
}

module.exports = {
  generateUniqueSKU
}; 