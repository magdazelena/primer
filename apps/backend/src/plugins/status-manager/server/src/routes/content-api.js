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
];
