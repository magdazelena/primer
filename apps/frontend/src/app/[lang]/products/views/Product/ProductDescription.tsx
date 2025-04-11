import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";

export function ProductDescription({description}: {description: BlocksContent}) {
    return (
        <div className="text-dark col-span-12 rich-text">
        <hr />
        <div className="lg:px-10 ">
          <BlocksRenderer content={description} />
        </div>
      </div>
    )
}