import { Category } from "@/types/article";
import { ProductCategory } from "@/types/product";
import { NavLink } from "./NavLink";
import React from "react";
import { usePathname } from "next/navigation";

type MenuCategory = Category | ProductCategory;
interface CategoriesMenuProps {
  categories: MenuCategory[];
  basePath: string;
  title: string;
}

const CategoriesMenu = ({
  categories,
  basePath,
  title,
}: CategoriesMenuProps) => {
  // Recursive function to render the menu and its nested children
  const renderMenu = (category: MenuCategory) => {
    const path = usePathname();
    const url = `${basePath}/${category.attributes.slug}`;
    const hasChildren =
      category.attributes.children &&
      category.attributes.children.data.length > 0;
    return (
      <div
        key={category.id}
        className={`dropdown-content absolute hidden ${
          hasChildren ? "dropdown" : ""
        }`}
      >
        <NavLink url={url} text={category.attributes.name} />

        {/* Nested dropdown for child categories */}
        {hasChildren &&
          category.attributes.children?.data.map(
            (childCategory: MenuCategory) => renderMenu(childCategory)
          )}
      </div>
    );
  };

  return (
    <div className="dropdown inline-block relative">
      <NavLink url={basePath} text={title} />
      {categories.map((category: MenuCategory) => {
        if (
          category.attributes.parent &&
          category.attributes.parent.data.length === 0
        )
          return renderMenu(category);
        return null;
      })}
    </div>
  );
};

export default CategoriesMenu;
