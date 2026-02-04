export default [
    {
      section: "plugins",
      displayName: "Access Status Manager",
      uid: "main",
      pluginName: "primershop-status-manager",
    },
    {
      section: "plugins",
      displayName: "Create",
      uid: "status.create",
      subCategory: "status",
      pluginName: "primershop-status-manager",
    },
    {
      section: "plugins",
      displayName: "Read",
      uid: "status.read",
      subCategory: "status",
      pluginName: "primershop-status-manager",
      aliases: [
        {
          actionId: "plugin::content-manager.explorer.read",
          subjects: ["plugin::primershop-status-manager.status"],
        },
      ],
    },
    {
      section: "plugins",
      displayName: "Update",
      uid: "status.update",
      subCategory: "status",
      pluginName: "primershop-status-manager",
    },
    {
      section: "plugins",
      displayName: "Delete",
      uid: "status.delete",
      subCategory: "status",
      pluginName: "primershop-status-manager",
    },
  ]
