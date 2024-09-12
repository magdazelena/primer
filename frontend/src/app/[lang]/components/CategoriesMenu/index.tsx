"use client";
import { Category } from "@/types/article";
import { ProductCategory } from "@/types/product";
import { NavLink } from "../NavLink";
import React, { useState, useEffect } from "react";
import { CategoryDropdown } from "./CategoryDropdown";

type MenuCategory = Category | ProductCategory;

interface CategoriesMenuProps {
  categories: MenuCategory[];
  basePath: string;
  title: string;
  activeMenu: string;
  onSetActiveMenu: (menuId: string) => void;
}

const CategoriesMenu = ({
  categories,
  basePath,
  title,
  activeMenu,
  onSetActiveMenu,
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

    const isActive = activePath.join("/") === newPath.join("/");

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
        isActive={
          isActive || activePath.join("/").startsWith(newPath.join("/"))
        }
        onToggle={handleToggle}
        onLinkClick={() => {
          resetMenu();
          onSetActiveMenu("");
        }}
      >
        {category.attributes.children?.data.map((childCategory: MenuCategory) =>
          renderMenu(childCategory, newPath)
        )}
      </CategoryDropdown>
    );
  };

  useEffect(() => {
    if (activeMenu !== basePath) {
      resetMenu(); // Close this menu if another menu becomes active
    } else {
      setMenuOpen(true); // Ensure the menu stays open if it's the active one
    }
  }, [activeMenu]);

  return (
    <div className="dropdown relative">
      <NavLink
        url={basePath}
        text={title}
        onClick={(e) => {
          e.preventDefault();
          if (!menuOpen || activeMenu !== basePath) {
            setActivePath([basePath]);
            onSetActiveMenu(basePath); // Set this menu as active
          } else {
            setMenuOpen(false);
            onSetActiveMenu(""); // Close the menu if it's already open
          }
        }}
      />
      <div
        className={`dropdown-content top-level ${
          menuOpen ? "active" : "hidden"
        } `}
      >
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
