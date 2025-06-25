"use client";
import * as React from "react";

import { getStrapiURL } from "@/api/api-helpers";
import { NextJsImage } from "@/components/Image";
import useDeviceSize from "@/hooks/useDeviceSize";
import Lightbox from "yet-another-react-lightbox";
import Inline from "yet-another-react-lightbox/plugins/inline";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

import { Icons } from "./Icons";

import type { Image } from "@/types/image";
import type { SlideImage } from "yet-another-react-lightbox";

const ImageSlider = ({ images }: { images: Image[] }) => {
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [width] = useDeviceSize();

  const toggleOpen = (state: boolean) => () => setOpen(state);

  const updateIndex = ({ index: current }: { index: number }) =>
    setIndex(current);
  const slides = images.map((image: Image): SlideImage => {
    return {
      src: getStrapiURL(image.url),
      height: image.height,
      width: image.width,
      alt: image.alternativeText || "alternative text missing",
    };
  });
  return (
    <div className="w-full lg:max-w-3xl m-auto">
      <Lightbox
        index={index}
        slides={slides}
        render={{
          slide: NextJsImage,
          iconPrev: () => <Icons.Prev />,
          iconClose: () => <Icons.Close />,
          iconNext: () => <Icons.Next />,
        }}
        plugins={[Inline, Thumbnails]}
        on={{
          view: updateIndex,
          click: toggleOpen(true),
        }}
        carousel={{
          preload: 3,
          padding: 0,
          spacing: 0,
          imageFit: "contain",
        }}
        inline={{
          style: {
            width: "100%",
            maxWidth: "900px",
            aspectRatio: `${width > 760 ? "3 / 2" : " 2/3"}`,
            margin: "0 auto",
          },
        }}
        thumbnails={{
          position: "bottom",
          height: 50,
          padding: 2,
          gap: 2,
          border: 0,
        }}
      />

      <Lightbox
        open={open}
        close={toggleOpen(false)}
        index={index}
        slides={slides}
        render={{
          slide: NextJsImage,
          iconPrev: () => <Icons.Prev />,
          iconClose: () => <Icons.Close />,
          iconNext: () => <Icons.Next />,
        }}
      />
    </div>
  );
};

export { ImageSlider };
