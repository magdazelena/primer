export const lookupCategoryTree = (filter: string) => {
  return {
    $or: [
      {
        category: {
          slug: filter,
        },
      },
      {
        category: {
          parent: {
            slug: filter,
          },
        },
      },
      {
        category: {
          parent: {
            parent: {
              slug: filter,
            },
          },
        },
      },
    ],
  };
};

export const CATEGORY_THREE_QUERY = {
  category: {
    populate: {
      parent: {
        populate: {
          parent: {
            fields: ["slug"],
          },
        },
        fields: ["slug"],
      },
      children: { fields: ["slug"] },
    },
    fields: ["slug"],
  },
};
