import { Creator } from "./creator";

interface ArticleBase {
  id: number;
  attributes: {
    title: string;
    slug: string;
  };
}
interface ArticleFull {
  attributes: {
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    blocks?: any[];
    cover: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    category: {
      data: {
        attributes: {
          name: string;
          slug: string;
        };
      };
    };
    creator: {
      data: Creator;
    };
  };
}
interface Category {
  id: number;
  attributes: {
    name: string;
    slug: string;
    children?: {
      data: Category[];
    };
    topLevel: boolean;
    articles: {
      data: Array<{}>;
    };
  };
}

type Article = ArticleBase & ArticleFull;
export { ArticleBase, Article, Category };
