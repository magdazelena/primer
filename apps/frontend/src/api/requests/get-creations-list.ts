import { Article } from "../../types/article";
import { Product } from "../../types/product";
import { fetchAPI } from "../fetch-api";

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
                cover: { fields: ["url"] },
                category: { fields: ["slug"] },
                creator: {
                    populate: {
                        avatar: {
                            fields: ["name", "alternativeText", "caption", "url"],
                        },
                        name: {
                            populate: true,
                        },
                    },
                },
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