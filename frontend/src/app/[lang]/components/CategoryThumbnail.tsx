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
      ? "bg-accent hover:bg-accent/50 text-primary"
      : "bg-accent/50 hover:bg-accent hover:text-primary text-secondary";
  }
  return (
    <Link
      href={`${basePath}/${categorySlug}`}
      className={`flex p-3 m-3 text-center rounded-lg w-20 h-20 lg:h-36 lg:w-36 hover:no-underline justify-center items-center transition-all duration-300 ${selectedFilter(
        categorySlug,
        selected
      )}`}
    >
      {categoryName}
    </Link>
  );
};
export { CategoryThumbnail };
