import { generateUniqueSKU } from '../../services/sku-generator';


export default {
  async beforeCreate(event: any) {
    const { data } = event.params;
    
    // Generate SKU if not provided
    if (!data.sku) {
      data.sku = await generateUniqueSKU();
    }
  },

  async beforeCreateMany(event: any) {
    const { data } = event.params;
    
    // Handle bulk creation
    if (Array.isArray(data)) {
      for (const item of data) {
        if (!item.sku) {
          item.sku = await generateUniqueSKU();
        }
      }
    }
  }
}; 