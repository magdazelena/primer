import { PLUGIN_ID } from "./pluginId";

export default ({ strapi }: { strapi: any }): void => {
  console.log('🔌 ========================================');
  console.log('🔌 Status Manager Server Plugin Registration');

  // Register permissions
  strapi.admin.services.permission.actionProvider.register({
    section: 'plugins',
    displayName: 'Status Manager',
    uid: PLUGIN_ID,
    pluginName: PLUGIN_ID,
  });

  // Register content types
  strapi.contentTypes[`plugin::${PLUGIN_ID}.status`] = {
    kind: 'collectionType',
    collectionName: 'status',
    info: {
      singularName: 'status',
      pluralName: 'statuses',
      displayName: 'Status',
      description: 'Status for products',
    },
    options: {
      draftAndPublish: false,
    },
    pluginOptions: {
      'content-manager': {
        visible: false,
      },
      'content-type-builder': {
        visible: false,
      },
    },
    attributes: {
      name: {
        type: 'string',
        minLength: 1,
        maxLength: 50,
        required: true,
        configurable: false,
      },
      published: {
        type: 'boolean',
        default: false,
      },
      order: {
        type: 'integer',
        default: 0,
      },
    },
  };
}; 