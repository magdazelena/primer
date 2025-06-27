import { PLUGIN_ID } from '../../pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon'; 

/** @type import('@strapi/strapi/admin').PluginDefinition */
export default {
  register(app) {

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
    console.log('🚀 Product Actions Plugin Loaded!');
  },

  bootstrap(app) {
    app.getPlugin('content-manager').apis.addEditViewSidePanel((panels) => {
      return [...panels, SeriesProductActions];
    });
  },
}; 