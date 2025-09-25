export default [
  {
    method: "GET",
    path: "/content-status",
    handler: "content_controller.getStatusForTarget",
    config: {
      policies: [
        {
          name: "admin::hasPermissions",
          config: { actions: ["plugin::primer-status-manager.status.read"] },
        },
      ],
    },
  },
  {
    method: "PUT",
    path: "/content-status",
    handler: "content_controller.setStatusForTarget",
    config: {
      policies: [
        {
          name: "admin::hasPermissions",
          config: { actions: ["plugin::primer-status-manager.status.update"] },
        },
      ],
    },
  },
];
