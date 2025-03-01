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
];
