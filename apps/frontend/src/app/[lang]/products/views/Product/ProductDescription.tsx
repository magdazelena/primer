import { BlocksRenderer } from "@strapi/blocks-react-renderer";

import type { BlocksContent } from "@strapi/blocks-react-renderer";

export const ProductDescription = ({
  description,
}: {
  description: BlocksContent;
}) => {
  return (
    <div className="text-dark col-span-12 lg:col-span-3 rich-text">
      <hr />
      <div className="lg:px-10 ">
        <BlocksRenderer content={description} />
      </div>
    </div>
  );
};
