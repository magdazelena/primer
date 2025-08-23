export default [
  {
    method: "GET",
    path: "/statuses",
    handler: "status_controller.listStatuses",
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
    description: "Get all statuses",
    tag: {
      plugin: "primer-status-manager",
      name: "statuses",
      actionType: "findMany",
    },
  },
  {
    method: "POST",
    path: "/status",
    handler: "status_controller.create",
    config: {
      policies: [
        {
          name: "admin::hasPermissions",
          config: {
            actions: ["plugin::primer-status-manager.status.create"],
          },
        },
      ],
    },
    description: "Create a new status",
    tag: {
      plugin: "primer-status-manager",
      name: "Status",
      actionType: "create",
    },
  },
  {
    method: "PUT",
    path: "/statuses/reorder",
    handler: "status_controller.reorder",
    config: {
      policies: [
        {
          name: "admin::hasPermissions",
          config: {
            actions: ["plugin::primer-status-manager.status.update"],
          },
        },
      ],
      description: "Reorder statuses",
      tag: {
        plugin: "primer-status-manager",
        name: "Status",
        actionType: "update",
      },
    },
  },
  {
    method: "PUT",
    path: "/statuses/delete",
    handler: "status_controller.delete",
    config: {
      policies: [
        {
          name: "admin::hasPermissions",
          config: {
            actions: ["plugin::primer-status-manager.status.delete"],
          },
        },
      ],
      description: "Delete a status",
      tag: {
        plugin: "primer-status-manager",
        name: "Status",
        actionType: "delete",
      },
    },
  },
  {
    method: "PUT",
    path: "/statuses/:id",
    handler: "status_controller.publish",
    config: {
      policies: [
        {
          name: "admin::hasPermissions",
          config: {
            actions: ["plugin::primer-status-manager.status.update"],
          },
        },
      ],
      description: "Update status publish state",
      tag: {
        plugin: "primer-status-manager",
        name: "Status",
        actionType: "update",
      },
    },
  },
];
