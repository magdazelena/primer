import { Initializer } from "./components/Initializer";
import { PluginIcon } from "./components/PluginIcon";
import { ProductStatusField } from "./components/ProductStatusField";
import { PLUGIN_ID } from "./pluginId";

interface App {
  registerPlugin: (plugin: unknown) => void;
  addMenuLink: (link: unknown) => void;
  getPlugin: (name: string) => {
    apis: {
      addEditViewSidePanel: (panels: unknown[]) => void;
    };
  };
}

export const plugin = {
  register(app: App) {
    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: true,
      name: PLUGIN_ID,
    });

    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: "Status manager",
      },
      Component: () => import("./pages/App"),
    });
  },
  bootstrap(app: App) {
    app
      .getPlugin("content-manager")
      .apis.addEditViewSidePanel([ProductStatusField]);
  },
};
