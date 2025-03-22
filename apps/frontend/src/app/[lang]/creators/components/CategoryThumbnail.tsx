import Link from "next/link";

const CategoryThumbnail = ({
  categoryName,
  categorySlug,
  selected,
  basePath,
}: {
  categoryName: string;
  categorySlug: string;
  selected: string;
  basePath: string;
}) => {
  function selectedFilter(current: string, selected: string) {
    return current === selected
      ? "bg-accentDark hover:bg-accentDark/50 text-light"
      : "bg-accentDark/50 hover:bg-accentDark hover:text-light text-dark";
  }
  return (
    <Link
      href={`${basePath}/${categorySlug}`}
      className={`m-3 flex min-h-20 w-full items-center justify-center rounded-lg p-3 text-center transition-all duration-300 hover:no-underline lg:size-36 ${selectedFilter(
        categorySlug,
        selected
      )}`}
    >
      {categoryName}
    </Link>
  );
};
export { CategoryThumbnail };
