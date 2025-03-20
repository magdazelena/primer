const adminAPIRoutes = require('./admin-api');

const routes = {

  'admin': {
    type: 'admin',
    routes: adminAPIRoutes
  }
};

module.exports = routes;
