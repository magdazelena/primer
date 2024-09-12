"use client";
import { useState } from "react";
import CategoriesMenu from "../CategoriesMenu";
import { NavLink } from "../NavLink";

const DesktopMenu = ({
  links,
  categories,
}: {
  links: Array<NavLink>;

  categories: { productCategories: Array<any>; blogCategories: Array<any> };
}) => {
  const [activeMenu, setActiveMenu] = useState("");
  return (
    <div className="items-center flex-shrink-0 hidden lg:flex">
      <ul className="items-stretch hidden space-x-3 lg:flex">
        {links.map((item: NavLink) => {
          if (item.url === "/products") {
            return (
              <CategoriesMenu
                key={item.id}
                title={item.text}
                categories={categories.productCategories}
                basePath={item.url}
                activeMenu={activeMenu}
                onSetActiveMenu={setActiveMenu}
              />
            );
          }
          if (item.url === "/blog") {
            return (
              <CategoriesMenu
                key={item.id}
                title={item.text}
                categories={categories.blogCategories}
                basePath={item.url}
                activeMenu={activeMenu}
                onSetActiveMenu={setActiveMenu}
              />
            );
          }
          return <NavLink key={item.id} {...item} />;
        })}
      </ul>
    </div>
  );
};

export { DesktopMenu };
