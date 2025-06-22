export default [
  {
    method: 'GET',
    path: '/admin/primer-status-manager/statuses',
    handler: 'status.find',
    config: {
      auth: {
        type: 'admin'
      },
      policies: [],
      description: 'Get all statuses',
      tag: {
        plugin: 'primer-status-manager',
        name: 'Status',
        actionType: 'find'
      }
    }
  },
  {
    method: 'POST',
    path: '/admin/primer-status-manager/statuses',
    handler: 'status.create',
    config: {
      auth: {
        type: 'admin'
      },
      policies: [],
      description: 'Create a new status',
      tag: {
        plugin: 'primer-status-manager',
        name: 'Status',
        actionType: 'create'
      }
    }
  },
  {
    method: 'PUT',
    path: '/admin/primer-status-manager/statuses/reorder',
    handler: 'status.reorder',
    config: {
      auth: {
        type: 'admin'
      },
      policies: [],
      description: 'Reorder statuses',
      tag: {
        plugin: 'primer-status-manager',
        name: 'Status',
        actionType: 'update'
      }
    }
  },
  {
    method: 'PUT',
    path: '/admin/primer-status-manager/statuses/delete',
    handler: 'status.delete',
    config: {
      auth: {
        type: 'admin'
      },
      policies: [],
      description: 'Delete a status',
      tag: {
        plugin: 'primer-status-manager',
        name: 'Status',
        actionType: 'delete'
      }
    }
  },
  {
    method: 'PUT',
    path: '/admin/primer-status-manager/statuses/:id',
    handler: 'status.publish',
    config: {
      auth: {
        type: 'admin'
      },
      policies: [],
      description: 'Update status publish state',
      tag: {
        plugin: 'primer-status-manager',
        name: 'Status',
        actionType: 'update'
      }
    }
  }
]; 