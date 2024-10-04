import { Creator } from "@/types/creator";

const CreatorView = ({ creator }: { creator: Creator }) => {
  return <p>{creator.attributes.name}</p>;
};

export { CreatorView };
