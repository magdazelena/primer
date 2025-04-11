
import { ImageSlider } from "@/components/ImageSlider";
import { Image } from "@/types/image";

export function ProductMedia({media}: {media: Image[]}) {
    return (
        <div className="space-y-6 col-span-12 lg:col-span-2">
        {media && <ImageSlider images={media} />}
      </div>
    )
}