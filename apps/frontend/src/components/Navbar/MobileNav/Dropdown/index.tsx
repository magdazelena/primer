"use client";
import React, { useState, useEffect } from "react";

import { NavLink } from "@/components/NavLink";

import { DropdownContent } from "./DropdownContent";

import type { Category } from "@/types/article";
import type { ProductCategory } from "@/types/product";

type MenuCategory = Category | ProductCategory;

interface DropdownProps {
  categories: MenuCategory[];
  basePath: string;
  title: string;
  activeMenu: string;
  onSetActiveMenu: (menuId: string) => void;
  onMobileClose?: () => void;
}

export const Dropdown = (props: DropdownProps) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [activePath, setActivePath] = useState<string[]>([]);

  const resetMenu = () => {
    setMenuOpen(false);
    setActivePath([]);
  };

  const renderMenu = (category: MenuCategory, path: string[] = []) => {
    const url = `${props.basePath}/${category.slug}`;
    const newPath = [...path, category.slug];

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
      <DropdownContent
        key={category.id}
        url={url}
        category={category}
        isActive={
          isActive || activePath.join("/").startsWith(newPath.join("/"))
        }
        onToggle={handleToggle}
        onLinkClick={() => {
          resetMenu();
          props.onSetActiveMenu("");
          if (props.onMobileClose) props.onMobileClose();
        }}
      >
        {category.children?.map((childCategory: MenuCategory) =>
          renderMenu(childCategory, newPath),
        )}
      </DropdownContent>
    );
  };

  useEffect(() => {
    if (props.activeMenu !== props.basePath) {
      resetMenu(); // Close this menu if another menu becomes active
    } else {
      setMenuOpen(true); // Ensure the menu stays open if it's the active one
    }
  }, [props.activeMenu, props.basePath]);

  const closeSubmenu = () => {
    setMenuOpen(false);
    props.onSetActiveMenu(""); // Close the menu if it's already open
    if (props.onMobileClose) props.onMobileClose();
  };

  const toggleSubmenu = (
    e: React.MouseEvent<HTMLSpanElement | HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    if (!menuOpen || props.activeMenu !== props.basePath) {
      setActivePath([props.basePath]);
      props.onSetActiveMenu(props.basePath); // Set this menu as active
    } else {
      closeSubmenu();
    }
  };

  return (
    <div className="dropdown relative space-y-2">
      <div className="flex">
        <NavLink
          url={props.basePath}
          text={props.title}
          onTouchEnd={closeSubmenu}
          onClick={toggleSubmenu}
        />
        <span
          className={`ml-2 ${menuOpen ? "hidden" : ""}`}
          onClick={toggleSubmenu}
        >
          +
        </span>
      </div>

      <div
        className={`dropdown-content space-y-2 pl-5 top-level ${
          menuOpen ? "active" : "hidden"
        } `}
      >
        {props.categories?.map((category: MenuCategory) => {
          if (category.topLevel) return renderMenu(category, [props.basePath]);
          return null;
        })}
      </div>
    </div>
  );
};
