/**
 * Admin permission actions for use in addMenuLink, Page.Protect, and useRBAC.
 * Action IDs must match uids registered in server bootstrap (registerMany).
 */
const pluginPermissions = {
  accessStatusManager: [
    {
      action: "plugin::primershop-status-manager.main",
      subject: null,
    },
  ],
};

export default pluginPermissions;
