import { RichTextModule } from "./richtext";

import type { Creator } from "./creator";
import type { Image } from "./image";
import type { BlocksContent } from "@strapi/blocks-react-renderer";

interface Product {
  id: number;
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
  creator?: Creator;
  media: Image[];
  coverImage: {
    url: string;
  };
  category: ProductCategory;
  series?: Product;
}

interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  products: Product[];
  children?: ProductCategory[];
  topLevel: boolean;
}

export type { Product, ProductCategory };
