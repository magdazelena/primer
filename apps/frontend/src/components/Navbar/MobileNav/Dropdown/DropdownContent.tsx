"use client";
import React from "react";

import { NavLink } from "@/components/NavLink";

import type { Category } from "@/types/article";
import type { ProductCategory } from "@/types/product";

type MenuCategory = Category | ProductCategory;

interface DropdownContentProps {
  url: string;
  category: MenuCategory;
  children?: React.JSX.Element[];
  isActive: boolean;
  onToggle: (e: React.MouseEvent) => void;
  onLinkClick: () => void;
}

export const DropdownContent = (props: DropdownContentProps) => {
  const { url, category, children, isActive, onToggle, onLinkClick } = props;
  return (
    <div
      className={`dropdown space-y-2 ${
        children?.length ? "has-children" : ""
      } ${isActive ? "active" : ""}`}
      onClick={onToggle}
    >
      <div
        className={`flex transition-all ${
          isActive ? "border-b-2 border-accentDark" : "border-b-0"
        }`}
      >
        <NavLink
          url={url}
          text={category.name}
          onClick={(e) => {
            e.stopPropagation();
            onLinkClick();
          }} // Prevent parent toggle when clicking link
        />
        {children?.length ? (
          <span
            className={`ml-2 ${isActive ? "hidden" : ""}`}
            onClick={onToggle}
          >
            +
          </span>
        ) : null}
      </div>

      {children && (
        <div
          className={`dropdown-content space-y-2 pl-5 ${
            isActive ? "active" : "hidden"
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
};
