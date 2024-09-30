"use client";
import { useState } from "react";
import { NavLink } from "@/app/[lang]/components/NavLink";

import DesktopDropdown from "./DesktopDropdown";

const DesktopNav = ({
  links,
  categories,
}: {
  links: Array<NavLink>;

  categories: { productCategories: Array<any>; blogCategories: Array<any> };
}) => {
  const [activeMenu, setActiveMenu] = useState("");

  return (
    <div className="items-center hidden lg:flex">
      <ul className="items-stretch hidden space-x-3 lg:flex">
        {links.map((item: NavLink) => {
          if (item.url === "/products") {
            return (
              <DesktopDropdown
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
              <DesktopDropdown
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

export { DesktopNav };
