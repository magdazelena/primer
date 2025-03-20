const adminAPIRoutes = require('./admin-api');

const routes = {
  'admin': {
    type: 'admin',
    routes: adminAPIRoutes
  },
  'content-api': {
    type: 'content-api',
    routes: [
      {
        method: 'GET',
        path: '/status-manager/statuses',
        handler: 'status.find',
        config: {
          auth: false,
          policies: []
        }
      },
      {
        method: 'GET',
        path: '/status-manager/statuses/:id',
        handler: 'status.findOne',
        config: {
          auth: false,
          policies: []
        }
      }
    ]
  }
};

module.exports = routes;
