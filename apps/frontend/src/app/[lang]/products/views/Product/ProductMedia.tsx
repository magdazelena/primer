import { ImageSlider } from "@/components/ImageSlider";

import type { Image } from "@/types/image";

export const ProductMedia = ({ media }: { media: Image[] }) => {
  return (
    <div className="space-y-6 col-span-12 lg:col-span-2">
      {media && <ImageSlider images={media} />}
    </div>
  );
};
