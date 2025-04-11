module.exports = ({ env }) => ({
  seo: {
    enabled: true,
  },
  'status-manager': {
    enabled: true,
    resolve: './src/plugins/status-manager'
  },
  'product-actions': {
    enabled: true,
    resolve: './src/plugins/product-actions'
  }
 
});
