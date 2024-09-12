"use client";
import { Category } from "@/types/article";
import { ProductCategory } from "@/types/product";
import { NavLink } from "../NavLink";
import React from "react";

type MenuCategory = Category | ProductCategory;

export function CategoryDropdown({
  url,
  category,
  children,
  isActive,
  onToggle,
  onLinkClick,
}: {
  url: string;
  category: MenuCategory;
  children?: React.JSX.Element[];
  isActive: boolean;
  onToggle: (e: React.MouseEvent) => void;
  onLinkClick: () => void;
}) {
  return (
    <div
      className={`dropdown ${children?.length ? "has-children" : ""} ${
        isActive ? "active" : ""
      }`}
      onClick={onToggle}
    >
      <NavLink
        url={url}
        text={category.attributes.name}
        onClick={(e) => {
          e.stopPropagation();
          onLinkClick();
        }} // Prevent parent toggle when clicking link
      />
      {children && (
        <div className={`dropdown-content ${isActive ? "active" : "hidden"}`}>
          {children}
        </div>
      )}
    </div>
  );
}
