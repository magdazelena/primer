'use strict';

/**
 * `product-status-middleware` middleware
 */

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    const isAdmin = strapi.admin && ctx.state.user?.roles?.some(role => role.type === 'admin');

    
    if (!isAdmin) {
      if (!ctx.query) ctx.query = {};
      if (!ctx.query.filters) ctx.query.filters = {};
      
      ctx.query.filters.statusName = {
        published: true
      };

    }
    
    await next();
  };
}; 