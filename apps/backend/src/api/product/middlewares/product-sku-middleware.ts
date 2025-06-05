import type { Context } from 'koa';
const skuGenerator = require('../services/sku-generator');

const applyTo = ['api::product.product'];

export default async (context: Context, next: () => Promise<void>): Promise<void> => {
  if (!applyTo.includes(context.uid)) {
    return next();
  }
  if (['create'].includes(context.action)) {
    const sku = await skuGenerator.generateUniqueSKU();
    context.params.data.sku = sku;
  }
  return next();
}; 