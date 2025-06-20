import type { Core } from '@strapi/types';
'use strict';

const productSkuMiddleware = require("./api/product/middlewares/product-sku-middleware");

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi }): void {
    strapi.documents.use(productSkuMiddleware);
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }: { strapi: Core.Strapi }*/): void {},
}; 