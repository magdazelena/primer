import { Image } from "@/types/image";
import componentResolver from "../../utils/component-resolver";

interface CardGroup {
  data: {
    title: string;
    type: "large" | "medium" | "small";
    cards: Card[];
  };
}
export interface Card {
  id: number;
  title: string;
  lead: string;
  coverImage: Image;
  link: {
    url: string;
    text: string;
  };
}
export default function CardGroup({ data }: CardGroup) {
  const { title, type, cards } = data;
  return (
    <div className="w-full p-10 text-center">
      {title && <h2 className="text-2xl font-bold">{title}</h2>}
      <div className="flex flex-wrap justify-evenly pt-10">
        {cards.map((card) => {
          const extendedCard = {
            __component: `elements.card-${type}`,
            ...card,
          };
          return componentResolver(extendedCard, card.id, "CardGroup");
        })}
      </div>
    </div>
  );
}
