
import { factories } from '@strapi/strapi';
export default (config: any, { strapi }: { strapi: any }) => {
  return async (ctx: any, next: () => Promise<void>) => {
    const isAdmin = strapi.admin && ctx.state.user?.roles?.some((role: any) => role.type === 'admin');

    
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