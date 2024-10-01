"use client";
import * as React from "react";
import Lightbox, { SlideImage } from "yet-another-react-lightbox";
import Inline from "yet-another-react-lightbox/plugins/inline";
import { NextJsImage } from "./Image";
import { Image } from "@/types/image";
import { getStrapiURL } from "../utils/api-helpers";

const ImageSlider = ({ images }: { images: Image[] }) => {
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  const toggleOpen = (state: boolean) => () => setOpen(state);

  const updateIndex = ({ index: current }: { index: number }) =>
    setIndex(current);
  const slides = images.map((image: Image): SlideImage => {
    return {
      src: getStrapiURL(image.attributes.url),
      height: image.attributes.height,
      width: image.attributes.width,
      alt: image.attributes.alternativeText || "alternative text missing",
    };
  });
  return (
    <div className="w-full max-w-3xl m-auto">
      <Lightbox
        index={index}
        slides={slides}
        render={{ slide: NextJsImage }}
        plugins={[Inline]}
        on={{
          view: updateIndex,
          click: toggleOpen(true),
        }}
        carousel={{
          padding: 0,
          spacing: 0,
          imageFit: "cover",
        }}
        inline={{
          style: {
            width: "100%",
            maxWidth: "900px",
            aspectRatio: "3 / 2",
            margin: "0 auto",
          },
        }}
      />

      <Lightbox
        open={open}
        close={toggleOpen(false)}
        index={index}
        slides={slides}
        render={{ slide: NextJsImage }}
      />
    </div>
  );
};

export { ImageSlider };
