
// page-populate-middleware.js
'use strict';

/**
 * `page-populate-middleware` middleware
 */

const fragments = require('./utils/fragments');

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    ctx.query = {
      populate: {
        contentSections: fragments.contentSections,
        seo: fragments.seo,
      },
      filters: { slug: ctx.query.filters.slug },
      locale: ctx.query.locale,
    };

    console.log('page-populate-middleware.js: ctx.query = ', ctx.query);

    await next();
  };
};