/**
 * Admin permission actions for use in addMenuLink, Page.Protect, and useRBAC.
 * Action IDs must match uids registered in server bootstrap (registerMany).
 * Sidebar panel is left ungated (any user); this is for Roles tab visibility.
 */
const pluginPermissions = {
  useProductActions: [
    {
      action: "plugin::primershop-product-actions.use",
      subject: null,
    },
  ],
};

export default pluginPermissions;
