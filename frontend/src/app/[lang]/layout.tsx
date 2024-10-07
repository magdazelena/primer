import type { Metadata } from "next";
import "./globals.css";
import { getStrapiMedia, getStrapiURL } from "@/utils/api-helpers";
import { fetchAPI } from "@/utils/fetch-api";

import { i18n } from "../../../i18n-config";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import { FALLBACK_SEO } from "@/utils/constants";
import qs from "qs";
import Body from "@/components/Body";
import Navbar from "@/components/Navbar";

async function getGlobal(lang: string): Promise<any> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!token)
    throw new Error("The Strapi API Token environment variable is not set.");

  const path = `/global`;
  const options = { headers: { Authorization: `Bearer ${token}` } };

  const urlParamsObject = {
    populate: [
      "metadata.shareImage",
      "favicon",
      "notificationBanner.link",
      "navbar.menuItems",
      "navbar.navbarLogo.logoImg",
      "footer.footerLogo.logoImg",
      "footer.menuLinks",
      "footer.legalLinks",
      "footer.socialLinks",
      "footer.categories",
    ],
    locale: lang,
  };
  return await fetchAPI(path, urlParamsObject, options);
}

async function getCategories(lang: string): Promise<any> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!token)
    throw new Error("The Strapi API Token environment variable is not set.");
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const params = {
    populate: {
      children: {
        populate: ["children"],
      },
    },
    locale: lang,
  };
  const queryString = qs.stringify(params);
  console.log(queryString);
  // Fetch product categories from Strapi
  const productCategoriesRes = await fetchAPI(
    `/product-categories`,
    params,
    options
  );
  const productCategories = productCategoriesRes.data;

  // Fetch blog categories from Strapi
  const blogCategoriesRes = await fetchAPI(`/categories`, params, options);
  const blogCategories = blogCategoriesRes.data;

  return { productCategories, blogCategories };
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const meta = await getGlobal(params.lang);

  if (!meta.data) return FALLBACK_SEO;

  const { metadata, favicon } = meta.data.attributes;
  const { url } = favicon.data.attributes;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
    icons: {
      icon: [new URL(url, getStrapiURL())],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  readonly children: React.ReactNode;
  readonly params: { lang: string };
}) {
  const global = await getGlobal(params.lang);
  // TODO: CREATE A CUSTOM ERROR PAGE
  if (!global.data) return null;

  const { notificationBanner, navbar, footer } = global.data.attributes;

  const categories = await getCategories(params.lang);
  const navbarLogoUrl = getStrapiMedia(
    navbar.navbarLogo.logoImg.data?.attributes.url
  );

  const footerLogoUrl = getStrapiMedia(
    footer.footerLogo.logoImg.data?.attributes.url
  );

  return (
    <html lang={params.lang}>
      <Body>
        <Navbar
          links={navbar.menuItems}
          categories={categories}
          logoUrl={navbarLogoUrl}
          logoText={navbar.navbarLogo.logoText}
        />

        <main className="text-secondary min-h-screen">{children}</main>

        <Banner data={notificationBanner} />

        <Footer
          logoUrl={footerLogoUrl}
          logoText={footer.footerLogo.logoText}
          menuLinks={footer.menuLinks}
          categoryLinks={footer.categories.data}
          legalLinks={footer.legalLinks}
          socialLinks={footer.socialLinks}
        />
      </Body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
