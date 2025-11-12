export const permissions = {
  actions: [
    {
      // Roles
      section: "plugins",
      displayName: "Create",
      uid: "product-series.create",
      subCategory: "product-series",
      pluginName: "primershop-product-actions",
    },
    {
      section: "plugins",
      displayName: "Read",
      uid: "product-series.read",
      subCategory: "product-series",
      pluginName: "primershop-product-actions",
      aliases: [
        {
          actionId: "plugin::content-manager.explorer.read",
          subjects: ["api::product-series.product-series"],
        },
      ],
    },
    {
      section: "plugins",
      displayName: "Update",
      uid: "product-series.update",
      subCategory: "product-series",
      pluginName: "primershop-product-actions",
    },
    {
      section: "plugins",
      displayName: "Delete",
      uid: "product-series.delete",
      subCategory: "product-series",
      pluginName: "primershop-product-actions",
    },
  ],
};
