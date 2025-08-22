import { fetchCreationsData } from "@/api/requests/get-creations-list";
import { getCreatorsSlugList } from "@/api/requests/get-creators-list";
import { ArticleCarousel } from "@/app/[lang]/blog/components/ArticleCarousel";
import { ProductCarousel } from "@/app/[lang]/products/components/ProductCarousel";

const LayoutRoute = async (props: {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
}) => {
  const params = await props.params;

  const { children } = props;

  const { articles, products } = await fetchCreationsData(params.slug);
  return (
    <section className="container p-8 mx-auto space-y-6 sm:space-y-12">
      <div>{children}</div>
      {articles.length > 0 && <ArticleCarousel articles={articles} />}
      {products.length > 0 && <ProductCarousel products={products} />}
    </section>
  );
};

export async function generateStaticParams() {
  return getCreatorsSlugList();
}

export default LayoutRoute;