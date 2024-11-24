// pages/[lang]/products/[productCategory]/[slug]/index.tsx

import {  GetStaticProps } from "next";
import LayoutRoute, {
  generateStaticParams,
} from "@/app/[lang]/products/[product-category]/[slug]/layout";

export const getStaticPaths = async () => {
  const paths = await generateStaticParams();
  return {
    paths,
    fallback: true,
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
