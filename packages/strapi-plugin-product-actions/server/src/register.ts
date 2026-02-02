import type { Core } from "@strapi/strapi";

const register = ({ strapi: _strapi }: { strapi: Core.Strapi }): void => {
  // Plugin registration (permissions registered in bootstrap only)
  void _strapi;
};

export default register;