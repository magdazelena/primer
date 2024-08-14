import { RichTextModule } from "./richtext";

interface Product {
  id: number;
  attributes: {
    name: string;
    description: RichTextModule[];
    PID: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    image: {
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
