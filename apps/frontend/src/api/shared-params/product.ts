import { CREATOR_QUERY } from "./creator";
import { CATEGORY_THREE_QUERY } from "./category";

/**
 * Base product query with essential fields
 */
export const PRODUCT_BASE_QUERY = {
  populate: {
    coverImage: { fields: ["url"] },
    category: { fields: ["name", "slug"] },
    creator: CREATOR_QUERY,
  },
};

/**
 * Product query with media and series
 */
export const PRODUCT_MEDIA_QUERY = {
  populate: {
    ...PRODUCT_BASE_QUERY.populate,
    media: {
      populate: "*",
    },
    series: { fields: ["name", "slug"] },
  },
};

/**
 * Product query with full category tree (for side menus)
 */
export const PRODUCT_WITH_CATEGORY_TREE_QUERY = {
  populate: {
    ...PRODUCT_BASE_QUERY.populate,
    ...CATEGORY_THREE_QUERY,
  },
};

/**
 * Product query for category listings
 */
export const PRODUCT_CATEGORY_LIST_QUERY = {
  populate: {
    coverImage: { fields: ["url"] },
    category: {
      populate: "*",
    },
    creator: {
      populate: "*",
    },
  },
};
