import { Image } from "./image";
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
    media: {
      data: Image[];
    }

    ,
    coverImage: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    category: {
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
    children?: {
      data: ProductCategory[];
    };
    topLevel: boolean;
  };
}

export { Product, ProductCategory };
