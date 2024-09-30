import { Category } from "@/types/article";
import { ProductCategory } from "@/types/product";
import { NavLink } from "@/app/[lang]/components/NavLink";

interface DesktopDropdownProps {
  title: string;
  categories: Array<Category | ProductCategory>;
  basePath: string;
}

const DesktopDropdown = ({
  title,
  categories,
  basePath,
}: DesktopDropdownProps) => {
  const renderMenu = (category: Category | ProductCategory) => {
    return (
      <li key={category.id} className="relative group">
        <NavLink
          text={category.attributes.name}
          url={`${basePath}/${category.attributes.slug}`}
          className="block px-4 py-2 hover:bg-gray-100"
        />
        {category.attributes.children?.data.length ? (
          <ul className="relative w-full hidden group-hover:block">
            {category.attributes.children.data.map(
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
        url={basePath}
        text={title}
        className="block px-4 py-2 hover:bg-gray-200"
      />
      {categories.length > 0 && (
        <ul className="fixed left-0 p-5 w-full hidden group-hover:flex top-level bg-white shadow-lg">
          <span className="block h-[2px] w-full bg-secondary mb-5"></span>
          {categories.map((category: Category | ProductCategory) =>
            renderMenu(category)
          )}
        </ul>
      )}
    </li>
  );
};

export default DesktopDropdown;
