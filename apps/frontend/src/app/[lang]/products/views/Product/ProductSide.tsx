export function ProductSide({
  name,
  retailPrice,
  shortDescription,
}: {
  name: string;
  retailPrice: number | string;
  shortDescription: string;
}) {
  return (
    <div className="space-y-6 col-span-12 lg:col-span-2">
      <h1 className="leading-tight text-5xl font-bold ">{name}</h1>
      <div className="text-dark">
        <h4>{typeof retailPrice === "number" ? retailPrice.toFixed(2) : retailPrice}</h4>
        <div>{shortDescription}</div>
      </div>
    </div>
  );
}
