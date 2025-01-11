
// page-populate-middleware.js
'use strict';

/**
 * `page-populate-middleware` middleware
 */


module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    ctx.query = {
      populate: ctx.query.populate,
      filters: { slug: ctx.query.filters?.slug },
      locale: ctx.query.locale,
    };

    await next();
  };
};