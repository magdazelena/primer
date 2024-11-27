import LangRedirect from "../../components/LangRedirect";
import componentResolver from "@/utils/component-resolver";
import { getPageBySlug } from "@/utils/get-page-by-slug";

export default async function RootRoute(
  props: {
    params: Promise<{ lang: string }>;
  }
) {
  const params = await props.params;
  const page = await getPageBySlug("home", params.lang);
  console.log(page)
  if (page.error && page.error.status == 401)
    throw new Error(
      "Missing or invalid credentials. Have you created an access token using the Strapi admin panel? http://localhost:1337/admin/"
    );
    if (!page.data) return null;
  if (page.data.length == 0 && params.lang !== "en") return <LangRedirect />;
  if (page.data.length === 0 || !page.data[0].attributes) return null;

  const contentSections = page.data[0].attributes.contentSections;
  if (!contentSections || contentSections.length === 0) return null;
  console.log('sections', contentSections)
  return contentSections.map((section: any, index: number) =>
    componentResolver(section, index)
  );
}
