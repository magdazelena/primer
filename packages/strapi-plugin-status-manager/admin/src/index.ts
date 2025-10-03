import { Initializer } from "./components/Initializer";
import { PluginIcon } from "./components/PluginIcon";
import { ProductStatusField } from "./components/ProductStatusField";
import { PLUGIN_ID } from "./pluginId";
import { addStatusColumnHook } from "./listView/add-status-column-hook";

import type { StrapiApp } from "@strapi/admin/strapi-admin";
import { StatusFilter } from "./listView/StatusFilter";

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
  },
  bootstrap(app: StrapiApp) {
    app
      .getPlugin("content-manager")
      .injectComponent("editView", "right-links", {
        name: "Status",
        Component: ProductStatusField,
      });

    app.registerHook('Admin/CM/pages/ListView/inject-column-in-table', addStatusColumnHook);

    const contentManager = app.getPlugin('content-manager');
    contentManager.injectComponent('listView', 'actions', {
      name: 'status-filter',
      Component: StatusFilter,
    });
  },
};

export default plugin;
