# Product Actions Plugin

## Overview

The Product Actions plugin provides functionality for managing product series in bulk. It allows you to create multiple products from a series template and update existing products within a series.

## Installation

The plugin is already included in the backend. To enable it, ensure it's properly configured in your Strapi application.

## Configuration

The plugin can be configured through environment variables or the Strapi admin panel. Key configuration options include:

```javascript
// config/plugins.js
module.exports = {
  'product-actions': {
    enabled: true,
    config: {
      // Plugin configuration options
    }
  }
}
```

## Usage

### Basic Usage

1. **Creating Products from a Series**
   ```javascript
   // Example: Creating products from a series
   const productSeries = strapi.plugin('product-actions').service('productSeries');
   const products = await productSeries.createProductsFromSeries(seriesId, count);
   ```

2. **Updating Products in a Series**
   ```javascript
   // Example: Updating products in a series
   const updateData = {
     fieldsToUpdate: [
       'description',
       'shortDescription',
       'media',
       'coverImage',
       'seo',
       'totalCost',
       'wholesalePrice',
       'retailPrice',
       'category',
       'creator'
     ]
   };
   
   await productSeries.updateSeriesProducts(seriesId, updateData);
   ```

### API Endpoints

The plugin provides the following admin API endpoints:

- `POST /admin/product-series/:id/create-products` - Create products from a series
  - Body: `{ count: number }` (default: 1)
  - Returns: Array of created products

- `PUT /admin/product-series/:id/update-products` - Update products in a series
  - Body: `{ fieldsToUpdate: string[] }`
  - Returns: `{ success: true }`

## API Reference

### ProductSeries Service

The main service interface provides the following methods:

```typescript
interface ProductSeries {
  // Create multiple products from a series
  createProductsFromSeries(seriesId: string, count?: number): Promise<Product[]>;
  
  // Update products in a series
  updateSeriesProducts(seriesId: string, updateData: UpdateData): Promise<boolean>;
}

interface UpdateData {
  fieldsToUpdate: Array<
    | 'description'
    | 'shortDescription'
    | 'media'
    | 'coverImage'
    | 'seo'
    | 'totalCost'
    | 'wholesalePrice'
    | 'retailPrice'
    | 'category'
    | 'creator'
  >;
}

interface Product {
  name: string;
  slug: string;
  series: string[];
  seriesIndex: number;
  category?: string;
  creator?: string;
  statusName?: string;
  publishedAt?: Date;
  description?: string;
  shortDescription?: string;
  media?: any[];
  coverImage?: any;
  seo?: any;
  totalCost?: number;
  wholesalePrice?: number;
  retailPrice?: number;
}
```

## Best Practices

1. **Series Management**
   - Keep series templates up to date
   - Use meaningful names and slugs
   - Maintain consistent data across series products

2. **Bulk Operations**
   - Monitor system resources during bulk operations
   - Consider the impact on database performance
   - Implement proper error handling

3. **Data Consistency**
   - Validate data before bulk operations
   - Ensure required fields are present
   - Maintain referential integrity

4. **Security**
   - Use admin authentication for all operations
   - Validate user permissions
   - Sanitize input data

## Example Implementation

```javascript
// Example: Managing a product series
const seriesManager = {
  async createAndUpdateSeries(seriesId) {
    const productSeries = strapi.plugin('product-actions').service('productSeries');
    
    // Create 5 new products from the series
    const newProducts = await productSeries.createProductsFromSeries(seriesId, 5);
    
    // Update all products in the series with new pricing
    await productSeries.updateSeriesProducts(seriesId, {
      fieldsToUpdate: ['wholesalePrice', 'retailPrice']
    });
    
    return newProducts;
  }
};
``` 