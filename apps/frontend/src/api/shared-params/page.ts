export const PAGE_CONTENT_SECTIONS_QUERY = {
  contentSections: {
    on: {
      "sections.card-group": {
        populate: {
          cards: {
            populate: "*",
          },
        },
      },
      "sections.hero": {
        populate: {
          picture: {
            populate: "*",
          },
          buttons: {
            populate: "*",
          },
        },
      },
    },
  },
};

export const GLOBAL_LAYOUT_QUERY = {
  populate: {
    metadata: {
      populate: "*",
    },
    navbar: {
      populate: {
        navbarLogo: { populate: "*" },
        menuItems: { populate: "*" },
      },
    },
    footer: {
      populate: {
        footerLogo: {
          populate: "*",
        },
        menuLinks: {
          populate: "*",
        },
        legalLinks: {
          populate: "*",
        },
        socialLinks: {
          populate: "*",
        },
        categories: {
          populate: "*",
        },
      },
    },
  },
};
