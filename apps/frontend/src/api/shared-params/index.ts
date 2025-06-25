import { ARTICLE_BASE_QUERY, ARTICLE_RICH_QUERY } from "./article";
import { lookupCategoryTree, CATEGORY_THREE_QUERY } from "./category";
import { CREATOR_QUERY } from "./creator";
import { PAGE_CONTENT_SECTIONS_QUERY, GLOBAL_LAYOUT_QUERY } from "./page";

const POPULATE_SLUG = {
  populate: { fields: ["slug"] },
};
const POPULATE_GENERIC = {
  populate: "*",
};
export {
  CREATOR_QUERY,
  ARTICLE_BASE_QUERY,
  ARTICLE_RICH_QUERY,
  CATEGORY_THREE_QUERY,
  lookupCategoryTree,
  PAGE_CONTENT_SECTIONS_QUERY,
  GLOBAL_LAYOUT_QUERY,
  POPULATE_GENERIC,
  POPULATE_SLUG,
};
