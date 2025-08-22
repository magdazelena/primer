import { BlocksRenderer } from "@strapi/blocks-react-renderer";

import type { BlocksContent } from "@strapi/blocks-react-renderer";

interface RichTextProps {
  data: {
    content: BlocksContent;
  };
}

const RichText = ({ data }: RichTextProps) => {
  const { content } = data;
  return (
    <div className="rich-text">
      <BlocksRenderer content={content} />
    </div>
  );
};

export default RichText;
