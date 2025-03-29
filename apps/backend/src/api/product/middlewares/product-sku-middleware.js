const applyTo = ['api::product.product'];
const skuGenerator = require('../services/sku-generator');
module.exports = async (context, next) => {
    if (!applyTo.includes(context.uid)) {
        return next();
      }
      if (['create'].includes(context.action)) {
        const sku = await skuGenerator.generateUniqueSKU();
        context.params.data.sku = sku;
      }
    return next();
  };