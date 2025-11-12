export default {
  kind: "collectionType",
  collectionName: "status_links",
  info: {
    singularName: "status-link",
    pluralName: "status-links",
    displayName: "Status Link",
    description:
      "Association between any content type document and a single status",
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
    targetUid: {
      type: "string",
      required: true,
    },
    targetDocumentId: {
      type: "string",
      required: true,
    },
    status: {
      type: "relation",
      relation: "manyToOne",
      target: "plugin::primershop-status-manager.status",
      required: false,
      configurable: false,
    },
  },
} as const;
