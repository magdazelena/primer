import { Initializer } from "./components/Initializer";
import { SeriesProductActions } from "./components/SeriesProductActions";
import { PLUGIN_ID } from "./pluginId";

interface App {
  registerPlugin: (plugin: unknown) => void;
  getPlugin: (name: string) => {
    apis: {
      addEditViewSidePanel: (
        callback: (panels: unknown[]) => unknown[],
      ) => void;
    };
  };
}

export const plugin = {
  register(app: App) {
    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },

  bootstrap(app: App) {
    app
      .getPlugin("content-manager")
      .apis.addEditViewSidePanel((panels: unknown[]) => {
        return [...panels, SeriesProductActions];
      });
  },
};
