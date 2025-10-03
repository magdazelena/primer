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
];


