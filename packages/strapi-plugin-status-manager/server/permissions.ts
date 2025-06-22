export default {
  'primer-status-manager': {
    enabled: true,
    config: {
      contentTypes: {
        status: {
          enabled: true,
          config: {
            actions: {
              'plugin::primer-status-manager.status.find': {
                enabled: true,
                policy: '',
              },
              'plugin::primer-status-manager.status.findOne': {
                enabled: true,
                policy: '',
              },
              'plugin::primer-status-manager.status.create': {
                enabled: true,
                policy: '',
              },
              'plugin::primer-status-manager.status.update': {
                enabled: true,
                policy: '',
              },
              'plugin::primer-status-manager.status.delete': {
                enabled: true,
                policy: '',
              },
            },
          },
        },
      },
    },
  },
}; 