export default [
  {
    method: "POST",
    path: "/list/:uid/status-by-ids",
    handler: "list_controller.statusByIds",
    config: {
      policies: [
        {
          name: "admin::hasPermissions",
          config: {
            actions: ["plugin::primer-status-manager.status.read"],
          },
        },
      ],
    },
    description: "Get statusLabel for a batch of document ids",
    tag: {
      plugin: "primer-status-manager",
      name: "List",
      actionType: "findMany",
    },
  },
  {
    method: "GET",
    path: "/list/:uid",
    handler: "list_controller.findManyWithStatus",
    config: {
      policies: [
        {
          name: "admin::hasPermissions",
          config: {
            actions: ["plugin::primer-status-manager.status.read"],
          },
        },
      ],
      middlewares: [
        "plugin::primer-status-manager.status",
      ],
    },
    description: "List entries for a CT with optional status filtering via query param",
    tag: {
      plugin: "primer-status-manager",
      name: "List",
      actionType: "findMany",
    },
  },
];


