import type { Core } from '@strapi/types';
'use strict';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi }): void {
    // Removed incorrect middleware registration
    // strapi.documents.use() is not the correct way to register middlewares in Strapi v5
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