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
    return current === selected;
  }
  return (
    <Link href={`${basePath}/${categorySlug}`}>
      <button
        className={`button ${
          selectedFilter(categorySlug, selected) ? "primary" : "secondary"
        }`}
      >
        {categoryName}
      </button>
    </Link>
  );
};
export { CategoryThumbnail };
