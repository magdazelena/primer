import { Category } from "@/types/article";
import { ProductCategory } from "@/types/product";
import { NavLink } from "@/components/NavLink";

interface DesktopDropdownProps {
  title: string;
  categories: Array<Category | ProductCategory>;
  basePath: string;
  url?: string;
}

const DesktopDropdown = ({
  title,
  categories,
  basePath,
  url,
}: DesktopDropdownProps) => {
  const renderMenu = (category: Category | ProductCategory) => {
    const url = `${basePath}/${category.slug}`;
    return (
      <li key={category.id} className="relative group">
        <NavLink
          text={category.name}
          url={url}
          className="block px-4 py-2 hover:bg-gray-100"
        />
        {category.children?.length ? (
          <ul className="relative w-full hidden group-hover:block">
            {category.children.map(
              (childCategory: Category | ProductCategory) =>
                renderMenu(childCategory)
            )}
          </ul>
        ) : null}
      </li>
    );
  };
  return (
    <li className="relative group">
      <NavLink
        url={url || basePath}
        text={title}
        className="block px-4 py-2 hover:bg-gray-200"
      />
      {categories?.length > 0 && (
        <ul className="fixed left-0 p-5 w-full hidden group-hover:flex top-level bg-light shadow-lg">
          <span className="block h-[2px] w-full bg-dark mb-5"></span>
          {categories.map((category: Category | ProductCategory) =>
            renderMenu(category)
          )}
        </ul>
      )}
    </li>
  );
};

export default DesktopDropdown;
