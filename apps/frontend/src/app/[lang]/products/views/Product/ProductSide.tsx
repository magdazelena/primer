export const ProductSide = ({
  name,
  retailPrice,
  shortDescription,
}: {
  name: string;
  retailPrice: number | string;
  shortDescription: string;
}) => {
  return (
    <div>
      <h1 className="leading-20 text-5xl font-bold font-display">{name}</h1>
      <div className="text-dark px-2">
        <h2 className="text-2xl font-bold py-2">
          {typeof retailPrice === "number"
            ? retailPrice.toFixed(2)
            : retailPrice}
        </h2>
        <div className="flex gap-2 py-5">
          <button className="button primary">Add to basket</button>
          <button className="button secondary">Save to wishlist</button>
        </div>
        <div>{shortDescription}</div>
      </div>
    </div>
  );
};
