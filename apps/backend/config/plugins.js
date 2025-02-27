module.exports = ({ env }) => ({
  seo: {
    enabled: true,
  },
  'primer-status-manager': {
    enabled: true,
    resolve: './src/plugins/status-manager'
  },
  slugify: {
    enabled: true,
    config: {
      contentTypes: {
        article: {
          field: 'slug',
          references: 'title',
        },
        category: {
          field: 'slug',
          references: 'name',
        },
        page: {
          field: 'slug',
          references: 'shortName',
        },
        product: {
          field: 'slug',
          references: 'name',
        },
        'product-category': {
          field: 'slug',
          references: 'name',
        },
      },
    },
  },
});
