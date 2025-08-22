import { getStrapiMedia } from "@/api/api-helpers";
import { renderButtonStyle } from "@/utils/render-button-style";
import Image from "next/image";
import Link from "next/link";

import { HighlightedText } from "./HighlightedText";

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

export const Hero = ({ data }: HeroProps) => {
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
      <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
        <div className="flex flex-col justify-center p-6 text-center rounded-lg lg:max-w-md xl:max-w-lg lg:text-left">
          <HighlightedText
            text={data.title}
            tag="h1"
            className="text-5xl leading-none sm:text-6xl mb-8 font-display"
            color="text-dark"
          />

          <HighlightedText
            text={data.description}
            tag="p"
            className="tmt-6 mb-8 text-lg sm:mb-12"
            color="text-dark"
          />
          <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
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
          <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
            <Image
              src={imgUrl || ""}
              alt={data.picture.alternativeText || "none provided"}
              className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 "
              width={600}
              height={600}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
