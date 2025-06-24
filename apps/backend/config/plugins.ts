export default ({ env }: { env: any }) => ({
  'primer-status-manager': {
    enabled: true,
  },
  'product-actions': {
    enabled: true,
    resolve: './src/plugins/product-actions'
  }
});
