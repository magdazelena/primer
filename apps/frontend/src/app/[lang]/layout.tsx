import "./globals.css";
import { getStrapiMedia, getStrapiURL } from "@/api/api-helpers";
import { fetchAPI } from "@/api/fetch-api";
import { GLOBAL_LAYOUT_QUERY } from "@/api/shared-params";
import { Body } from "@/components/Body";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { NotFound } from "@/components/NotFound";
import { FALLBACK_SEO } from "@/utils/constants";

import { i18n } from "../../../i18n-config";
import { getCategories } from "../../api/requests/get-all-categories";

import type { Global } from "@/types/global";
import type { Metadata } from "next";

async function getGlobal(lang: string): Promise<Global> {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  if (!token)
    throw new Error("The Strapi API Token environment variable is not set.");

  const path = `/global`;
  const options = { headers: { Authorization: `Bearer ${token}` } };

  const urlParamsObject = {
    ...GLOBAL_LAYOUT_QUERY,
    locale: lang,
  };
  return fetchAPI(path, urlParamsObject, options);
}

export async function generateMetadata(props: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  let global;
  try {
    global = await getGlobal(params.lang);
  } catch (error) {
    console.error("Error fetching metadata: ", error);
    return {};
  }

  if (!global.data) return FALLBACK_SEO;
  const { metadata, favicon } = global.data;

  return {
    title: metadata?.metaTitle,
    description: metadata?.metaDescription,
    icons: {
      icon: [new URL(favicon?.url || "", getStrapiURL())],
    },
  };
}

const RootLayout = async (props: {
  readonly children: React.ReactNode;
  readonly params: Promise<{ lang: string }>;
}) => {
  let params = { lang: "en" };
  try {
    params = await props.params;
  } catch (error) {
    console.error("Couldn't load params", error);
  }

  const { children } = props;

  let global;
  try {
    global = await getGlobal(params.lang);
  } catch (error) {
    console.error("Layout.tsx: ", error);
    return <NotFound />;
  }
  if (!global.data) return <NotFound />;
  const categories = await getCategories(params.lang);


  const { navbar, footer } = global.data;
  if (!navbar || !footer) return <NotFound />;
  const navbarLogoUrl = getStrapiMedia(navbar.navbarLogo?.logoImg?.url);

  const footerLogoUrl = getStrapiMedia(footer.footerLogo?.logoImg?.url || null);

  return (
    <html lang={params.lang}>
      <Body>
        <Navbar
          links={navbar.menuItems}
          categories={categories}
          logoUrl={navbarLogoUrl}
          logoText={navbar.navbarLogo?.logoText}
        />

        <main className="text-dark min-h-screen">{children}</main>

        <Footer
          logoUrl={footerLogoUrl}
          logoText={footer.footerLogo?.logoText || null}
          menuLinks={footer.menuLinks}
          categoryLinks={footer.categories}
          legalLinks={footer.legalLinks}
          socialLinks={footer.socialLinks}
        />
      </Body>
    </html>
  );
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default RootLayout;
