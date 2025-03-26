const path = require('path');

module.exports = ({ env }) => ({
  connection: {
    client: 'sqlite',
    connection: {
      filename: path.join(__dirname, '..', '.tmp', env('DATABASE_FILENAME', 'data.db')),
    },
    useNullAsDefault: true,
  },
});
