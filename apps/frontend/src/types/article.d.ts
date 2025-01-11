import { Creator } from "./creator";

interface ArticleBase {
  id: number;
  title: string;
  slug: string;
}
interface ArticleFull {

  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  blocks?: any[];
  cover: {
    url: string;
  };
  category: {
    name: string;
    slug: string;
  };
  creator: Creator;

}
interface Category {
  id: number;
  name: string;
  slug: string;
  children?: Category[];
  topLevel: boolean;
  articles: Array<{}>;


}

type Article = ArticleBase & ArticleFull;
export { ArticleBase, Article, Category };
