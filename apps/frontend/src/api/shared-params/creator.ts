export const CREATOR_QUERY = {
  populate: {
    avatar: {
      fields: ["name", "alternativeText", "caption", "url"],
    },
  },
};
