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
      <li key={category.id} className="group relative">
        <NavLink
          text={category.name}
          url={url}
          className="block px-4 py-2 hover:bg-gray-100"
        />
        {category.children?.length ? (
          <ul className="relative hidden w-full group-hover:block">
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
    <li className="group relative">
      <NavLink
        url={url || basePath}
        text={title}
        className="block px-4 py-2 hover:bg-gray-200"
      />
      {categories?.length > 0 && (
        <ul className="top-level fixed left-0 hidden w-full bg-light p-5 shadow-lg group-hover:flex">
          <span className="mb-5 block h-[2px] w-full bg-dark"></span>
          {categories.map((category: Category | ProductCategory) =>
            renderMenu(category)
          )}
        </ul>
      )}
    </li>
  );
};

export default DesktopDropdown;
