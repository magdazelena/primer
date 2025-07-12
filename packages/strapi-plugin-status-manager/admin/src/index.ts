import { Initializer } from "./components/Initializer";
import { PluginIcon } from "./components/PluginIcon";
import ProductStatusField from "./components/ProductStatusField";
import { PLUGIN_ID } from "./pluginId";

/** @type import('@strapi/strapi/admin').PluginDefinition */
export default {
  register(app: any) {
    console.log("🔌 Registering Status Manager Admin Plugin...", PLUGIN_ID);

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
      Component: () => import("./pages/App.js"),
    });

    console.log("✅ Status Manager Admin Plugin registered successfully");
  },
  bootstrap(app: any) {
    console.log("🚀 Bootstrapping Status Manager Admin Plugin...");

    app
      .getPlugin("content-manager")
      .apis.addEditViewSidePanel([ProductStatusField]);

    console.log("✅ Status Manager Admin Plugin bootstrapped successfully");
  },
};
