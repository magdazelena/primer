import { Category } from "@/types/article";
import { ProductCategory } from "@/types/product";
import { NavLink } from "@/app/[lang]/components/NavLink";

interface DesktopDropdown {
  title: string;
  categories: Array<Category | ProductCategory>;
  basePath: string;
  activeMenu: string;
  onSetActiveMenu: (menu: string) => void;
}

const DesktopDropdown = ({
  title,
  categories,
  basePath,
  activeMenu,
  onSetActiveMenu,
}: DesktopDropdown) => {
  const renderMenu = (category: Category | ProductCategory) => {
    return (
      <li key={category.id} className="ml-4">
        <NavLink
          text={category.attributes.name}
          url={category.attributes.slug}
          className="block py-1 hover:underline"
        />
        {category.attributes.children?.data.length ? (
          <ul className="ml-4">
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
      <NavLink url={basePath} text={title} />
      <div className="fixed left-0 w-full hidden group-hover:block bg-white shadow-lg">
        <ul className="p-4">
          {categories.map((category: Category | ProductCategory) => {
            if (category.attributes.topLevel) return renderMenu(category);
            return null;
          })}
        </ul>
      </div>
    </li>
  );
};

export default DesktopDropdown;
