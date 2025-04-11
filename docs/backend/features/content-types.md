# Content Types

Strapi provides a flexible content type system that allows you to define and manage different types of content in your application.

## Content Type Structure

### Basic Content Type
```json
{
  "kind": "collectionType",
  "collectionName": "articles",
  "info": {
    "singularName": "article",
    "pluralName": "articles",
    "displayName": "Article"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "content": {
      "type": "richtext"
    },
    "publishedAt": {
      "type": "datetime"
    }
  }
}
```

## Field Types

### Basic Fields
- **String**: Text content
- **Text**: Long-form text
- **RichText**: Formatted text with media
- **Number**: Numeric values
- **Boolean**: True/false values
- **Date**: Date values
- **Time**: Time values
- **DateTime**: Date and time values
- **JSON**: JSON data
- **Enumeration**: Predefined options

### Media Fields
- **Media**: Single file
- **Files**: Multiple files
- **Images**: Image files
- **Videos**: Video files

### Relation Fields
- **One-to-One**: Single related item
- **One-to-Many**: Multiple related items
- **Many-to-One**: Single related item from many
- **Many-to-Many**: Multiple related items

## Creating Content Types

### Using Admin Panel
1. Navigate to Content-Type Builder
2. Click "Create new collection type"
3. Define fields and relationships
4. Save the content type

### Using CLI
```bash
strapi generate:api article
```

## Dynamic Zones

Dynamic zones allow flexible content structures:

```json
{
  "attributes": {
    "content": {
      "type": "dynamiczone",
      "components": [
        "components.text-block",
        "components.image-gallery",
        "components.video-embed"
      ]
    }
  }
}
```

## Components

### Creating Components
```json
{
  "collectionName": "components_text_blocks",
  "info": {
    "displayName": "Text Block",
    "icon": "file-text"
  },
  "attributes": {
    "title": {
      "type": "string"
    },
    "content": {
      "type": "richtext"
    }
  }
}
```

## Lifecycle Hooks

### Available Hooks
```javascript
module.exports = {
  lifecycles: {
    beforeCreate(data) {
      // Before create
    },
    afterCreate(result, data) {
      // After create
    },
    beforeUpdate(params, data) {
      // Before update
    },
    afterUpdate(result, params, data) {
      // After update
    },
    beforeDelete(params) {
      // Before delete
    },
    afterDelete(result, params) {
      // After delete
    }
  }
}
```

## Best Practices

1. **Field Naming**
   - Use descriptive names
   - Follow consistent conventions
   - Avoid reserved words

2. **Relationships**
   - Define clear relationships
   - Use appropriate relation types
   - Consider performance implications

3. **Validation**
   - Add required fields
   - Set field validations
   - Use custom validators

4. **Performance**
   - Limit number of relations
   - Use appropriate field types
   - Implement proper indexing

## Example Content Types

### Article
```json
{
  "kind": "collectionType",
  "collectionName": "articles",
  "info": {
    "singularName": "article",
    "pluralName": "articles",
    "displayName": "Article"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "title"
    },
    "content": {
      "type": "richtext"
    },
    "author": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::author.author"
    },
    "category": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::category.category"
    },
    "tags": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::tag.tag"
    },
    "featuredImage": {
      "type": "media",
      "multiple": false,
      "required": true,
      "allowedTypes": ["images"]
    }
  }
}
```

### Category
```json
{
  "kind": "collectionType",
  "collectionName": "categories",
  "info": {
    "singularName": "category",
    "pluralName": "categories",
    "displayName": "Category"
  },
  "options": {
    "draftAndPublish": false
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "slug": {
      "type": "uid",
      "targetField": "name"
    },
    "description": {
      "type": "text"
    }
  }
}
``` 