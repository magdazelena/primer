import Link from "next/link";
import Image from "next/image";
import HighlightedText from "./HighlightedText";
import { getStrapiMedia } from "@/api/api-helpers";
import { renderButtonStyle } from "@/utils/render-button-style";

interface Button {
  id: string;
  url: string;
  text: string;
  type: string;
  newTab: boolean;
}

interface Picture {
    id: string;
      url: string;
      name: string;
      alternativeText: string;

  
}

interface HeroProps {
  data: {
    id: string;
    title: string;
    description: string;
    picture: Picture;
    buttons: Button[];
    colorCode: string;
    fullImage: boolean;
  };
}

export default function Hero({ data }: HeroProps) {
  const imgUrl = getStrapiMedia(data.picture.url) || "";

  return (
    <section
      className={`${data.fullImage ? "text-light" : "text-dark"}`}
      style={{
        backgroundColor: data.colorCode,
        backgroundImage: data.fullImage ? "url(" + imgUrl + ")" : "",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto flex flex-col justify-center p-6 sm:py-12 lg:flex-row lg:justify-between lg:py-24">
        <div className="flex flex-col justify-center rounded-lg p-6 text-center lg:max-w-md lg:text-left xl:max-w-lg">
          <HighlightedText
            text={data.title}
            tag="h1"
            className="mb-8 font-display text-5xl leading-none sm:text-6xl"
            color="text-dark"
          />

          <HighlightedText
            text={data.description}
            tag="p"
            className="tmt-6 mb-8 text-lg sm:mb-12"
            color="text-dark"
          />
          <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-center sm:space-x-4 sm:space-y-0 lg:justify-start">
            {data.buttons.map((button: Button, index: number) => (
              <Link
                key={index}
                href={button.url}
                target={button.newTab ? "_blank" : "_self"}
                className={renderButtonStyle(button.type)}
              >
                {button.text}
              </Link>
            ))}
          </div>
        </div>
        {!data.fullImage && (
          <div className="xl:h-112 2xl:h-128 mt-8 flex h-72 items-center justify-center p-6 sm:h-80 lg:mt-0 lg:h-96">
            <Image
              src={imgUrl || ""}
              alt={
                data.picture.alternativeText || "none provided"
              }
              className="xl:h-112 2xl:h-128 h-72 object-contain sm:h-80 lg:h-96 "
              width={600}
              height={600}
            />
          </div>
        )}
      </div>
    </section>
  );
}
