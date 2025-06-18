export default ({ env }: { env: any }) => ({
  'primer-status-manager': {
    enabled: true,
    config: {
      // Add your plugin configuration here
    }
  },
  'product-actions': {
    enabled: true,
    resolve: './src/plugins/product-actions'
  }
});
