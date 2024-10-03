// pages/[lang]/products/[productCategory]/[slug]/index.tsx

import { GetStaticPaths, GetStaticProps } from "next";
import LayoutRoute, {
  generateStaticParams,
} from "@/app/[lang]/products/[product-category]/[slug]/layout";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await generateStaticParams();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      params,
    },
  };
};

export default LayoutRoute;
