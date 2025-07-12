export default {
  kind: "collectionType",
  collectionName: "status",
  info: {
    singularName: "status",
    pluralName: "statuses",
    displayName: "Status",
    description: "Status for products",
  },
  options: {
    draftAndPublish: false,
  },
  pluginOptions: {
    "content-manager": {
      visible: false,
    },
    "content-type-builder": {
      visible: false,
    },
  },
  attributes: {
    name: {
      type: "string",
      minLength: 1,
      maxLength: 50,
      required: true,
      configurable: false,
    },
    published: {
      type: "boolean",
      default: false,
    },
    order: {
      type: "integer",
      default: 0,
    },
  },
};
