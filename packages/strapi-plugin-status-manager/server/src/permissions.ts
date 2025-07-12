export default {
  actions: [
    {
      // Roles
      section: "plugins",
      displayName: "Create",
      uid: "status.create",
      subCategory: "status",
      pluginName: "primer-status-manager",
    },
    {
      section: "plugins",
      displayName: "Read",
      uid: "status.read",
      subCategory: "status",
      pluginName: "primer-status-manager",
      aliases: [
        {
          actionId: "plugin::content-manager.explorer.read",
          subjects: ["plugin::primer-status-manager.status"],
        },
      ],
    },
    {
      section: "plugins",
      displayName: "Update",
      uid: "status.update",
      subCategory: "status",
      pluginName: "primer-status-manager",
    },
    {
      section: "plugins",
      displayName: "Delete",
      uid: "status.delete",
      subCategory: "status",
      pluginName: "primer-status-manager",
    },
  ],
};
