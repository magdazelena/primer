module.exports = [
  {
    method: 'GET',
    path: '/statuses', // Ensure this is not "/"
    handler: 'status.find',  // Ensure this matches your controller file and method name
    config: {
      auth: { authenticate: true },
      description: 'Fetch status',
    },
  },
  {
    method: 'POST',
    path: '/statuses', // Ensure this is not "/"
    handler: 'status.create',  // Ensure this matches your controller file and method name
    config: {
      auth: { authenticate: true }
    },
  },
  {
    method: 'PUT',
    path: '/statuses/reorder',
    handler: 'status.reorder',
    config: {
      auth: { authenticate: true }
    },
  },
  {
    method: 'PUT',
    path: '/statuses/:id',
    handler: 'status.publish',
    config: {
      auth: { authenticate: true }
    },
  },
  {
    method: 'PATCH',
    path: '/statuses',
    handler: 'status.delete',
    config: {
      auth: { authenticate: true }
    },
  },
];
