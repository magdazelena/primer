import type { Schema, Struct } from '@strapi/types';

export interface PluginStatusManagerStatus extends Struct.CollectionTypeSchema {
  collectionName: 'status';
  info: {
    singularName: 'status';
    pluralName: 'statuses';
    displayName: 'Status parameter';
    description: 'Status name';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: true;
    };
  };
  attributes: {
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
        maxLength: 50;
      }>;
    published: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    order: Schema.Attribute.Integer &
      Schema.Attribute.DefaultTo<0>;
    products: Schema.Attribute.Relation<'oneToMany', 'api::product.product'>;
  };
}

export interface PluginStatusManagerStatusInput {
  name: string;
  published?: boolean;
  order?: number;
}

export interface PluginStatusManagerStatusDocument {
  id: number;
  documentId: string;
  name: string;
  published: boolean;
  order: number;
  products?: Array<{
    id: number;
    name: string;
  }>;
  createdAt: string;
  updatedAt: string;
} 