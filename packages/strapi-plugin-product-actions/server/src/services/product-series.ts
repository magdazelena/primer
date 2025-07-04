import type { Core } from "@strapi/strapi";

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async createProductsFromSeries(seriesId: string, count = 1) {
    const series = await getSeries(strapi, seriesId);
    const products: any[] = [];
    const startIndex = series.products?.length || 0;

    for (let i = 0; i < count; i++) {
      const index = startIndex + i;

      // Create product with series data
      const product = await strapi.documents("api::product.product").create({
        data: {
          name: `${series.name} #${index + 1}`,
          slug: `${series.slug}-${index + 1}`,
          series: {
            set: [{ documentId: seriesId }],
          } as any,
          seriesIndex: index,
          category: {
            set: [{ documentId: series.category?.documentId }],
          } as any,
          creator: {
            set: [{ documentId: series.creator?.documentId }],
          } as any,
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
        } as any,
      });

      products.push(product);
    }

    return products;
  },

  async updateSeriesProducts(seriesId: string, updateData: any) {
    const series = await getSeries(strapi, seriesId);

    const { fieldsToUpdate } = updateData;

    const dataToUpdate = {} as any;

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

    const updatePromises = series.products.map((product) =>
      strapi.documents("api::product.product").update({
        documentId: product.documentId,
        data: {
          ...dataToUpdate,
        },
      }),
    );

    await Promise.all(updatePromises);
    return true;
  },
});

async function getSeries(strapi, seriesId) {
  const series = await strapi.db
    .query("api::product-series.product-series")
    .findOne({
      where: { documentId: seriesId },
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
  return series;
}
