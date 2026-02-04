import { Initializer } from "./components/Initializer";
import { SeriesProductActions } from "./components/SeriesProductActions";
import { PLUGIN_ID } from "./pluginId";

import type { PanelComponent } from "@strapi/content-manager/strapi-admin";

const plugin = {
  register(app: any) {
    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },

  bootstrap(app: any) {
    app
      .getPlugin("content-manager")
      .apis.addEditViewSidePanel((panels: any): PanelComponent[] => {
        return [...panels, SeriesProductActions];
      });
  },
};

export default plugin;
