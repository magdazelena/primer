import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';
import ProductStatusField from './components/ProductStatusField';

export default {
  register(app) {
    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: 'Status manager',
      },
      Component: () => import('./pages/App')
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },
  bootstrap(app) {
    app.getPlugin('content-manager').apis.addEditViewSidePanel((panels) => {
      return [ProductStatusField, ...panels];
    });
  }

};
