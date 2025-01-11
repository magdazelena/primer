import LangRedirect from "../../components/LangRedirect";
import componentResolver from "@/utils/component-resolver";
import { getPageBySlug } from "@/utils/get-page-by-slug";

export default async function RootRoute(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const populate = {
    contentSections: {
      on: {
        "sections.card-group": {
          populate: {
            cards: {
              populate: "*",
            },
          },
        },
      },
    },
  };
  const page = await getPageBySlug("home", params.lang, populate);

  if (page.error && page.error.status == 401)
    throw new Error(
      "Missing or invalid credentials. Have you created an access token using the Strapi admin panel? http://localhost:1337/admin/"
    );
  if (!page.data) return null;
  if (page.data.length == 0 && params.lang !== "en") return <LangRedirect />;

  const contentSections = page.data[0].contentSections;
  if (!contentSections || contentSections.length === 0) return null;
  return contentSections.map((section: any, index: number) =>
    componentResolver(section, index)
  );
}
