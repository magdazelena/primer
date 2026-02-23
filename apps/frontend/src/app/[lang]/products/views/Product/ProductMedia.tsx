"use client";

import Image from "next/image";

import ImageSlider from "@/components/ImageSlider";
import { getStrapiURL } from "@/api/api-helpers";
import { useIsMdUp } from "@/hooks/useBreakpoint";

import type { Image as StrapiImage } from "@/types/image";

export const ProductMedia = ({ media }: { media: StrapiImage[] }) => {
  const isMdUp = useIsMdUp();

  if (!media || media.length === 0) {
    return null;
  }

  // Below md: show slider only
  if (!isMdUp) {
    return (
      <div className="space-y-6 col-span-12 lg:col-span-2">
        <ImageSlider images={media} />
      </div>
    );
  }

  // md and up: show grid layout
  const [firstImage, ...restImages] = media;

  return (
    <div className="space-y-6 col-span-12 lg:col-span-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {firstImage && (
          <div className="md:col-span-2">
            <div className="relative w-full overflow-hidden rounded-xl">
              <Image
                src={getStrapiURL(firstImage.url)}
                alt={firstImage.alternativeText || "Product image"}
                width={firstImage.width}
                height={firstImage.height}
                className="h-full w-full object-cover"
                sizes="(min-width: 1024px) 600px, 100vw"
              />
            </div>
          </div>
        )}

        {restImages.map((image) => (
          <div
            key={image.url}
            className="relative w-full overflow-hidden rounded-xl"
          >
            <Image
              src={getStrapiURL(image.url)}
              alt={image.alternativeText || "Product image"}
              width={image.width}
              height={image.height}
              className="h-full w-full object-cover"
              sizes="(min-width: 1024px) 300px, 50vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
