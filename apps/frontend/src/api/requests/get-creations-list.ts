import { Article } from "../../types/article";
import { Product } from "../../types/product";
import { fetchAPI } from "../fetch-api";
import { CREATOR_QUERY } from "../shared-params";

export async function fetchCreationsData(filter: string): Promise<{
    products: Product[];
    articles: Article[];
}> {

    const filters = filter
        ? {
            filters: {
                creator: {
                    slug: filter,
                },
            },
        }
        : {};
    const articlesResponse = await fetchAPI(
        "/articles",
        {
            populate: {
                coverImage: { fields: ["url"] },
                category: { fields: ["slug"] },
                creator: CREATOR_QUERY
            },
            pagination: {
                start: 0,
                limit: 4,
            },

            sort: { "publishedAt": "desc" },
            ...filters,
        }
    );
    const productsResponse = await fetchAPI(
        "/products",
        {
            populate: {
                coverImage: { fields: ["url"] },
            },
            pagination: {
                start: 0,
                limit: 4,
            },

            sort: { "publishedAt": "desc" },
            ...filters,
        }
    );
    return {
        articles: articlesResponse.data,
        products: productsResponse.data,
    };

}