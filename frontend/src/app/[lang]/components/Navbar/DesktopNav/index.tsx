"use client";
import { NavLink } from "@/app/[lang]/components/NavLink";
import DesktopDropdown from "./DesktopDropdown";

const DesktopNav = ({
  links,
  categories,
}: {
  links: Array<NavLink>;
  categories: { productCategories: Array<any>; blogCategories: Array<any> };
}) => {
  const renderProductTopLevelCategories = () => {
    return categories.productCategories.map((category: any) => {
      if (category.attributes.topLevel) {
        return (
          <DesktopDropdown
            key={category.id}
            title={category.attributes.name}
            categories={category.attributes.children?.data || []}
            basePath={category.attributes.slug}
          />
        );
      }
      return null;
    });
  };
  return (
    <div className="items-center hidden lg:flex">
      <ul className="items-stretch hidden space-x-3 lg:flex">
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
