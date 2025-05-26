module.exports = ({ env }) => ({
  'status-manager': {
    enabled: true,
    resolve: './src/plugins/status-manager'
  },
  'product-actions': {
    enabled: true,
    resolve: './src/plugins/product-actions'
  }
});
