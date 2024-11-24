import { BlocksContent } from "@strapi/blocks-react-renderer";
import { Image } from "./image";
import { Creator } from "./creator";

interface Product {
  id: number;
  attributes: {
    name: string;
    description: BlocksContent;
    shortDescription: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    retailPrice: number;
    wholesalePrice: number;
    totalCost: number;
    creator?: {
      data: Creator
    };
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

interface ProductParams {
  slug: string;
  productCategory: string;
}

export { Product, ProductCategory, ProductParams };
