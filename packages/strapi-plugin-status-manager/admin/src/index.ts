import { defaultLogger } from "../../server/src/utils/debug";

import { Initializer } from "./components/Initializer";
import { PluginIcon } from "./components/PluginIcon";
import { ProductStatusField } from "./components/ProductStatusField";
import { PLUGIN_ID } from "./pluginId";

import type { StrapiApp } from "@strapi/admin/strapi-admin";

const plugin = {
  register(app: StrapiApp) {
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
      permissions: [],
      Component: () =>
        import("./pages/HomePage").then((module) => ({
          default: module.HomePage,
        })),
    });

    app.customFields.register({
      name: "statusName",
      pluginId: PLUGIN_ID,
      type: "string",
      icon: PluginIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: "Status",
      },
      intlDescription: {
        id: `${PLUGIN_ID}.plugin.description`,
        defaultMessage: "Select any status",
      },
      components: {
        Input: () =>
          import("./components/ProductStatusField").then((module) => ({
            default: module.ProductStatusField,
          })),
      },
    });
  },
  bootstrap(app: StrapiApp) {
    app
      .getPlugin("content-manager")
      .injectComponent("editView", "right-links", {
        name: "Status",
        Component: ProductStatusField,
      });
  },
};

export default plugin;
