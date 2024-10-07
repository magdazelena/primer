import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";

interface RichText {
  data: {
    content: BlocksContent;
  };
}

export default function RichText({ data }: RichText) {
  const { content } = data;
  return (
    <div className="rich-text">
      <BlocksRenderer content={content} />
    </div>
  );
}
