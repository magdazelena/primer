"use client";
import { NavLink } from "@/components/NavLink";
import DesktopDropdown from "./DesktopDropdown";
import { ProductCategory } from "../../../types/product";
import { Category } from "../../../types/article";

const DesktopNav = ({
  links,
  categories,
}: {
  links: Array<NavLink>;
  categories: { productCategories: Array<ProductCategory>; blogCategories: Array<Category> };
}) => {
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
    <div className="hidden items-center lg:flex ">
      <ul className="hidden items-stretch space-x-3 lg:flex">
        {links.map((item: NavLink) => {
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
        })}
      </ul>
    </div>
  );
};

export { DesktopNav };
