export default {
  type: "admin",
  routes: [
    {
      method: "POST",
      path: "/create-products",
      handler: "productSeries.createProducts",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [
                "plugin::primershop-product-actions.product-series.create",
              ],
            },
          },
        ],
      },
    },
    {
      method: "PUT",
      path: "/update-products",
      handler: "productSeries.updateProducts",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [
                "plugin::primershop-product-actions.product-series.update",
              ],
            },
          },
        ],
      },
    },
  ],
};
