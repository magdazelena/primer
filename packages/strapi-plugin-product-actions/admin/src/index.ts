import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { SeriesProductActions } from './components/SeriesProductActions';


/** @type import('@strapi/strapi/admin').PluginDefinition */
export default {
  register(app: any) {

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
    console.log('🚀 Product Actions Plugin Loaded!');
  },

  bootstrap(app: any) {
    app.getPlugin('content-manager').apis.addEditViewSidePanel((panels: any) => {
      return [...panels, SeriesProductActions];
    });
  },
}; 