import type { Core } from "@strapi/strapi";

interface Series {
  name: string;
  slug: string;
  products?: Array<{ documentId: string }>;
  category?: { documentId: string };
  creator?: { documentId: string };
  description: unknown;
  shortDescription: string;
  media: unknown;
  coverImage: unknown;
  seo: unknown;
  totalCost: number;
  wholesalePrice: number;
  retailPrice: number;
}

interface ProductData {
  name: string;
  slug: string;
  series: { set: string };
  seriesIndex: number;
  category: { set: string };
  creator: { set: string };
  publishedAt: undefined;
  description: unknown;
  shortDescription: string;
  media: unknown;
  coverImage: unknown;
  seo: unknown;
  totalCost: number;
  wholesalePrice: number;
  retailPrice: number;
}

export const productSeriesService = ({ strapi }: { strapi: Core.Strapi }) => ({
  async createProductsFromSeries(seriesId: string, count = 1) {
    const series = await getSeries(strapi, seriesId);

    const products: unknown[] = [];
    const startIndex = series.products?.length || 0;

    for (let i = 0; i < count; i++) {
      const index = startIndex + i;

      // Create product with series data
      const product = await strapi.documents("api::product.product").create({
        data: {
          name: `${series.name} #${index + 1}`,
          slug: `${series.slug}-${index + 1}`,
          series: {
            set: seriesId,
          },
          seriesIndex: index,
          category: series.category
            ? {
                set: series.category.documentId,
              }
            : null,
          creator: series.creator
            ? {
                set: series.creator?.documentId,
              }
            : null,
          publishedAt: undefined,
          // Copy all required fields from series
          description: series.description,
          shortDescription: series.shortDescription,
          media: series.media,
          coverImage: series.coverImage,
          seo: series.seo,
          totalCost: series.totalCost,
          wholesalePrice: series.wholesalePrice,
          retailPrice: series.retailPrice,
        } as ProductData,
      });
      products.push(product);
    }

    return products;
  },

  async updateSeriesProducts(seriesId: string, fieldsToUpdate: string[]) {
    const series = await getSeries(strapi, seriesId);

    const dataToUpdate: Record<string, unknown> = {};

    if (fieldsToUpdate.includes("description")) {
      dataToUpdate.description = series.description;
    }

    if (fieldsToUpdate.includes("shortDescription")) {
      dataToUpdate.shortDescription = series.shortDescription;
    }

    if (fieldsToUpdate.includes("media")) {
      dataToUpdate.media = series.media;
    }

    if (fieldsToUpdate.includes("coverImage")) {
      dataToUpdate.coverImage = series.coverImage;
    }

    if (fieldsToUpdate.includes("seo")) {
      dataToUpdate.seo = series.seo;
    }

    if (fieldsToUpdate.includes("totalCost")) {
      dataToUpdate.totalCost = series.totalCost;
    }

    if (fieldsToUpdate.includes("wholesalePrice")) {
      dataToUpdate.wholesalePrice = series.wholesalePrice;
    }

    if (fieldsToUpdate.includes("retailPrice")) {
      dataToUpdate.retailPrice = series.retailPrice;
    }

    if (fieldsToUpdate.includes("category")) {
      dataToUpdate.category = {
        set: [series.category?.documentId],
      };
    }

    if (fieldsToUpdate.includes("creator")) {
      dataToUpdate.creator = {
        set: [series.creator?.documentId],
      };
    }

    const updatePromises = series.products?.map((product) =>
      strapi.documents("api::product.product").update({
        documentId: product.documentId,
        data: {
          ...dataToUpdate,
        },
      }),
    );

    if (updatePromises) {
      await Promise.all(updatePromises);
    }
    return true;
  },
});

async function getSeries(
  strapi: Core.Strapi,
  seriesId: string,
): Promise<Series> {
  const series = await strapi
    .documents("api::product-series.product-series")
    .findOne({
      documentId: seriesId,
      populate: [
        "products",
        "category",
        "creator",
        "media",
        "coverImage",
        "seo",
      ],
    });

  if (!series) {
    throw new Error("Series not found");
  }
  return series as unknown as Series;
}
