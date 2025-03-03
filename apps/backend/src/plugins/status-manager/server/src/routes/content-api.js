module.exports = [
  {
    method: 'GET',
    path: '/statuses', // Ensure this is not "/"
    handler: 'status.find',  // Ensure this matches your controller file and method name
    config: {
      policies: [],
      auth: false
    },
  },
  {
    method: 'POST',
    path: '/statuses', // Ensure this is not "/"
    handler: 'status.create',  // Ensure this matches your controller file and method name
    config: {
      policies: [],
      auth: false
    },
  },
  {
    method: 'PUT',
    path: '/statuses/reorder',
    handler: 'status.reorder',
    config: {
      policies: [],
      auth: false
    },
  },
  {
    method: 'PUT',
    path: '/statuses/:id',
    handler: 'status.publish',
    config: {
      policies: [],
      auth: false
    },
  },
  {
    method: 'PATCH',
    path: '/statuses',
    handler: 'status.delete',
    config: {
      policies: [],
      auth: false, // Change to `true` if authentication is required
    },
  },
];
