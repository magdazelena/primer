import { PLUGIN_ID } from "../../pluginId";

export default ({ strapi }: { strapi: any }): void => {
  console.log('🔌 Registering Status Manager Plugin...');


    strapi.registerPlugin({
      id: PLUGIN_ID,
      isReady: false,
      name: PLUGIN_ID,
    });
  

};
