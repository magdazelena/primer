"use client";
import { NavLink } from "@/components/NavLink";

import { DesktopDropdown } from "./DesktopDropdown";

import type { Category } from "@/types/article";
import type { ProductCategory } from "@/types/product";

interface DesktopNavProps {
  links: Array<NavLink>;
  categories: {
    productCategories: Array<ProductCategory>;
    blogCategories: Array<Category>;
  };
}

const DesktopNav = ({ links, categories }: DesktopNavProps) => {
  const renderProductTopLevelCategories = () => {
    return categories.productCategories.map((category: ProductCategory) => {
      if (category.topLevel) {
        return (
          <DesktopDropdown
            key={category.id}
            title={category.name}
            categories={category.children || []}
            url={`/products/${category.slug}`}
            basePath="/products"
          />
        );
      }
      return null;
    });
  };
  return (
    <div className="items-center hidden lg:flex ">
      <ul className="items-stretch hidden space-x-3 lg:flex">
        {links.map(
          (item: NavLink) => {
            if (item.url === "/products") {
              return renderProductTopLevelCategories();
            }
            if (item.url === "/blog") {
              return (
                <DesktopDropdown
                  key={item.id}
                  title={item.text}
                  categories={categories.blogCategories}
                  basePath={item.url}
                />
              );
            }
            return <NavLink key={item.id} {...item} />;
          },
        )}
      </ul>
    </div>
  );
};

export { DesktopNav };
