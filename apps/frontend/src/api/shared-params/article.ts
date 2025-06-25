export const ARTICLE_BASE_QUERY = {
  populate: {
    coverImage: { fields: ["url"] },
    creator: { populate: "*" },
    category: { fields: ["name"] },
  },
};

export const ARTICLE_RICH_QUERY = {
  populate: {
    ...ARTICLE_BASE_QUERY.populate,
    blocks: {
      on: {
        "sections.rich-text": {
          populate: "*",
        },
      },
    },
  },
};
