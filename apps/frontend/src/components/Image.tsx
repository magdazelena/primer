import Image from "next/image";
import {
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
  useLightboxState,
} from "yet-another-react-lightbox";

import type { StaticImageData } from "next/image";
import type { Slide } from "yet-another-react-lightbox";

function isNextJsImage(slide: Slide) {
  return (
    isImageSlide(slide) &&
    typeof slide.width === "number" &&
    typeof slide.height === "number"
  );
}
interface NextJsImageType {
  slide: Slide;
  offset: number;
  rect: {
    width: number;
    height: number;
  };
}

const NextJsImage = ({ slide, offset, rect }: NextJsImageType) => {
  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps();

  const { currentIndex } = useLightboxState();

  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);
  if (!isNextJsImage(slide)) return undefined;

  const { width: slideWidth, height: slideHeight } = slide;

  const width = !cover
    ? Math.round(
        Math.min(
          rect.width,
          (rect.height / (slideHeight || 1)) * (slideWidth || 0),
        ),
      )
    : rect.width;

  const height = !cover
    ? Math.round(
        Math.min(
          rect.height,
          (rect.width / (slideWidth || 1)) * (slideHeight || 0),
        ),
      )
    : rect.height;

  return (
    <div style={{ position: "relative", width, height }}>
      <Image
        fill
        alt={slide.alt || ""}
        src={slide.src}
        loading="eager"
        draggable={false}
        placeholder={
          (slide as StaticImageData).blurDataURL ? "blur" : undefined
        }
        style={{
          objectFit: cover ? "cover" : "contain",
          cursor: click ? "pointer" : undefined,
        }}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
        onClick={
          offset === 0 ? () => click?.({ index: currentIndex }) : undefined
        }
      />
    </div>
  );
};

export { NextJsImage };
