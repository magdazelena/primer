export default {
  kind: 'collectionType',
  collectionName: 'status',
  info: {
    singularName: 'status', // kebab-case mandatory
    pluralName: 'statuses', // kebab-case mandatory
    displayName: 'Status parameter',
    description: 'Status name',
  },
  options: {
    draftAndPublish: false,
  },
  pluginOptions: {
    'content-manager': {
      visible: false,
    },
    'content-type-builder': {
      visible: true,
    }
  },
  attributes: {
    name: {
      type: 'string',
      min: 1,
      max: 50,
      configurable: false,
      required: true
    },
    published: {
      type: 'boolean',
    },
    order: {
      type: 'integer'
    },
    products: {
      type: 'relation',
      relation: 'oneToMany',
      target: 'api::product.product',
      mappedBy: 'statusName'
    }
  }
};