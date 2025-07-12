export const productSeriesRoutes = {
  type: "admin",
  routes: [
    {
      method: "POST",
      path: "/:id/create-products",
      handler: "productActions.createProducts",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: ["plugin::primer-product-actions.product-series.create"],
            },
          },
        ],
      },
    },
    {
      method: "PUT",
      path: "/:id/update-products",
      handler: "productActions.updateProducts",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: ["plugin::primer-product-actions.product-series.update"],
            },
          },
        ],
      },
    },
  ],
};
