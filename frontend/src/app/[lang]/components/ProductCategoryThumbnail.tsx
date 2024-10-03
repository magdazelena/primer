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
      ? "bg-accent hover:bg-accent/50 text-primary"
      : "bg-accent/50 hover:bg-accent hover:text-primary text-secondary";
  }
  return (
    <Link
      href={`/products/${categorySlug}`}
      className={`rounded-lg min-w-20 h-20 lg:h-36 lg:w-36 flex hover:no-underline justify-center items-center ${selectedFilter(
        categorySlug,
        selected
      )}`}
    >
      {categoryName}
    </Link>
  );
};
export { ProductCategoryThumbnail };
