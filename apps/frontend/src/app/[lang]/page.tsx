import { getPageBySlug } from "@/api/requests/get-page-by-slug";
import { PAGE_CONTENT_SECTIONS_QUERY } from "@/api/shared-params";
import componentResolver from "@/utils/component-resolver";

import LangRedirect from "../../components/LangRedirect";

export const RootRoute = async (props: {
  params: Promise<{ lang: string }>;
}) => {
  const params = await props.params;
  const page = await getPageBySlug(
    "home",
    params.lang,
    PAGE_CONTENT_SECTIONS_QUERY,
  );

  if (page.error && page.error.status == 401)
    throw new Error(
      "Missing or invalid credentials. Have you created an access token using the Strapi admin panel? http://localhost:1337/admin/",
    );
  if (!page.data) return null;
  if (page.data.length == 0 && params.lang !== "en") return <LangRedirect />;

  const contentSections = page.data[0].contentSections;
  if (!contentSections || contentSections.length === 0) return null;
  return contentSections.map((section: unknown, index: number) =>
    componentResolver(section, index),
  );
};
