import { formatDate, getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import Image from "next/image";
import { Product } from "@/types/product";
import { RichTextElement, RichTextModule } from "@/types/richtext";

export default function ProductView({ data }: { data: Product }) {
  const { name, description, publishedAt, coverImage, retailPrice } =
    data.attributes;
  const imageUrl = getStrapiMedia(coverImage.data?.attributes.url);

  return (
    <article className="space-y-8 text-secondary">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="article cover image"
          width={400}
          height={400}
          className="w-full h-96 object-cover rounded-lg"
        />
      )}
      <div className="space-y-6">
        <h1 className="leading-tight text-5xl font-bold ">{name}</h1>
        <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center text-secondary">
          <div className="flex items-center md:space-x-2">LAla</div>
        </div>
      </div>

      <div className="text-secondary">
        {description.map((module: RichTextModule) =>
          module.children.map((element: RichTextElement) => {
            return (
              <p className="py-4" key={element.type}>
                {" "}
                {element.text}
              </p>
            );
          })
        )}
      </div>
    </article>
  );
}
