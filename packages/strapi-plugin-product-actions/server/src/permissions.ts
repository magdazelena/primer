
export default {
  actions: [
    {
      // Roles
      section: 'plugins',
      displayName: 'Create',
      uid: 'product-series.create',
      subCategory: 'product-series',
      pluginName: 'primer-product-actions',
    },
    {
      section: 'plugins',
      displayName: 'Read',
      uid: 'product-series.read',
      subCategory: 'product-series',
      pluginName: 'primer-product-actions',
      aliases: [
        {
          actionId: 'plugin::content-manager.explorer.read',
          subjects: ['plugin::primer-product-actions.product-series'],
        },
      ],
    },
    {
      section: 'plugins',
      displayName: 'Update',
      uid: 'product-series.update',
      subCategory: 'product-series',
      pluginName: 'primer-product-actions',
    },
    {
      section: 'plugins',
      displayName: 'Delete',
      uid: 'product-series.delete',
      subCategory: 'product-series',
      pluginName: 'primer-product-actions',
    }
  ],
};