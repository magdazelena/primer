import { Category } from "../../types/article";
import { ElementsNotificationBanner, LayoutFooter, LayoutLogo, LayoutNavbar, LinksLink, LinksSocialLink, MenuLink, SocialLink } from "../../types/components";

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
export type GlobalLayoutQuery = {
  meta: {
    metadata: { metaTitle: string; metaDescription: string };
    favicon: { url: string };
  };
  notificationBanner: ElementsNotificationBanner["attributes"];
  navbar: LayoutNavbar["attributes"] & {
    navbarLogo: LayoutLogo["attributes"] & {
      logoImg: LayoutLogo["attributes"]["logoImg"] & {
        url: string;
      };
      logoText: string;
    };
    menuItems: Array<{
      title: string;
      url: string;
    }>;
  };
  footer: LayoutFooter["attributes"] & {
    footerLogo: LayoutLogo["attributes"] & {
      logoImg: LayoutLogo["attributes"]["logoImg"] & {
        url: string;
      };
      logoText: string;
    };
    menuLinks: LinksLink["attributes"][];
    legalLinks: LinksLink["attributes"][];
    socialLinks: LinksSocialLink["attributes"][];
    categories: Category[];
  };
};
