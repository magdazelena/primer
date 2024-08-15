import { RichTextModule } from "./richtext";

interface Product {
  id: number;
  attributes: {
    name: string;
    description: RichTextModule[];
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    retailPrice: number;
    wholesalePrice: number;
    totalCost: number;
    coverImage: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    productCategory: {
      data: ProductCategory;
    };
  };
}

interface ProductCategory {
  id: number;
  attributes: {
    name: string;
    slug: string;
    products: { data: Product[] };
  };
}

export { Product, ProductCategory };
