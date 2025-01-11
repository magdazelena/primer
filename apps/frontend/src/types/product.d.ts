import { BlocksContent } from "@strapi/blocks-react-renderer";
import { Image } from "./image";
import { RichTextModule } from "./richtext";
import { Creator } from "./creator";

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
}

interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  products: { data: Product[] };
  children?: ProductCategory[];
  topLevel: boolean;
}

export { Product, ProductCategory };
