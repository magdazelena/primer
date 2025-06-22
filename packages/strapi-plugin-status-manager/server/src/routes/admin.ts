export default {
    type: 'admin',
    routes: [
        {
        method: 'GET',
        path: '/primer-status-manager/statuses',
        handler: 'status.find',
        config: {
            policies: [
                'admin::isAuthenticatedAdmin',
                {
                name: 'plugin::content-manager.hasPermissions',
                config: { actions: ['plugin::status-manager.status.read'] },
                },
            ],
        },
        description: 'Get all statuses',
        tag: {
            plugin: 'primer-status-manager',
            name: 'statuses',
            actionType: 'find'
        }
        }
    ]
}