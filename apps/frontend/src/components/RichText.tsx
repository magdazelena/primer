import { BlocksRenderer } from "@strapi/blocks-react-renderer";

import type { BlocksContent } from "@strapi/blocks-react-renderer";

interface RichText {
  data: {
    content: BlocksContent;
  };
}

export const RichText = ({ data }: RichText) => {
  const { content } = data;
  return (
    <div className="rich-text">
      <BlocksRenderer content={content} />
    </div>
  );
};
