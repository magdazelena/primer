export default [
  {
    method: 'GET',
    path: '/statuses', // Ensure this is not "/"
    handler: 'status.find',  // Ensure this matches your controller file and method name
    config: {
      auth: {
        type: 'admin'
      },
      description: 'Fetch status',
    },
  },
  {
    method: 'POST',
    path: '/statuses', // Ensure this is not "/"
    handler: 'status.create',  // Ensure this matches your controller file and method name
    config: {
      auth: {
        type: 'admin'
      }
    },
  },
  {
    method: 'PUT',
    path: '/statuses/reorder',
    handler: 'status.reorder',
    config: {
      auth: {
        type: 'admin'
      }
    },
  },

  {
    method: 'PUT',
    path: '/statuses/delete',
    handler: 'status.delete',
    config: {
      auth: {
        type: 'admin'
      }
    },
  },
  {
    method: 'PUT',
    path: '/statuses/:id',
    handler: 'status.publish',
    config: {
      auth: {
        type: 'admin'
      }
    },
  }
]; 