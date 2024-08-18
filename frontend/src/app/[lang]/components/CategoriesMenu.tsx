import { Category } from "@/types/article";
import { ProductCategory } from "@/types/product";
import { NavLink } from "./NavLink";
import React from "react";

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
    const url = `${basePath}/${category.attributes.slug}`;
    const hasChildren =
      category.attributes.children &&
      category.attributes.children.data.length > 0;

    return (
      <div key={category.id} className="dropdown">
        {/* Parent category link */}
        <NavLink url={url} text={category.attributes.name} />

        {/* Child categories dropdown */}
        {hasChildren && (
          <div className="dropdown-content hidden ">
            {category.attributes.children?.data.map(
              (childCategory: MenuCategory) => renderMenu(childCategory)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="dropdown relative">
      {/* Top-level NavLink for the main menu item */}
      <NavLink url={basePath} text={title} />
      {/* Dropdown content for the top-level categories */}
      <div className="dropdown-content hidden ">
        {categories?.map((category: MenuCategory) => {
          if (category.attributes.topLevel) return renderMenu(category);
          return null;
        })}
      </div>
    </div>
  );
};

export default CategoriesMenu;
