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
    authorsBio: {
      data: {
        attributes: {
          name: string;
          avatar: {
            data: {
              attributes: {
                url: string;
              };
            };
          };
        };
      };
    };
  };
}
type Article = ArticleBase & ArticleFull;
export { ArticleBase, Article };
