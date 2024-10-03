import Link from "next/link";

const ProductCategoryThumbnail = ({
  categoryName,
  categorySlug,
  selected,
}: {
  categoryName: string;
  categorySlug: string;
  selected: string;
}) => {
  function selectedFilter(current: string, selected: string) {
    return current === selected
      ? "px-3 py-1 rounded-lg hover:underline bg-accent text-primary"
      : "px-3 py-1 rounded-lg hover:underline bg-accent/50 text-secondary";
  }
  return (
    <Link
      href={`/products/${categorySlug}`}
      className={selectedFilter(categorySlug, selected)}
    >
      {categoryName}
    </Link>
  );
};
export { ProductCategoryThumbnail };
