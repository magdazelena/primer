export default {
  kind: 'collectionType',
  collectionName: 'status',
  info: {
    singularName: 'status',
    pluralName: 'statuses',
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
      minLength: 1,
      maxLength: 50,
      required: true,
      configurable: false
    },
    published: {
      type: 'boolean',
      default: false
    },
    order: {
      type: 'integer',
      default: 0
    },
    products: {
      type: 'relation',
      relation: 'oneToMany',
      target: 'api::product.product',
      mappedBy: 'statusName',
      configurable: false
    }
  }
};