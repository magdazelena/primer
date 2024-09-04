"use client";
import { Category } from "@/types/article";
import { ProductCategory } from "@/types/product";
import { NavLink } from "../NavLink";
import React, { useState } from "react";
import { CategoryDropdown } from "./CategoryDropdown";

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
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [activePath, setActivePath] = useState<string[]>([]);
  const resetMenu = () => {
    setMenuOpen(false);
    setActivePath([]);
  };
  const renderMenu = (category: MenuCategory, path: string[] = []) => {
    const url = `${basePath}/${category.attributes.slug}`;
    const newPath = [...path, category.attributes.slug];

    const isActive = activePath.join("/").startsWith(newPath.join("/"));

    const handleToggle = (e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent the event from bubbling up
      if (isActive) {
        setActivePath(path);
      } else {
        setActivePath(newPath);
      }
    };

    return (
      <CategoryDropdown
        key={category.id}
        url={url}
        category={category}
        isActive={isActive}
        onToggle={handleToggle}
        onLinkClick={resetMenu}
      >
        {category.attributes.children?.data.map((childCategory: MenuCategory) =>
          renderMenu(childCategory, newPath)
        )}
      </CategoryDropdown>
    );
  };

  return (
    <div className="dropdown relative">
      <NavLink
        url={basePath}
        text={title}
        onClick={(e) => {
          if (!menuOpen) e.preventDefault();
          setActivePath([basePath]);
          setMenuOpen((open) => !open);
        }}
      />
      <div className={`dropdown-content ${menuOpen ? "active" : "hidden"}`}>
        {categories?.map((category: MenuCategory) => {
          if (category.attributes.topLevel)
            return renderMenu(category, [basePath]);
          return null;
        })}
      </div>
    </div>
  );
};

export default CategoriesMenu;
