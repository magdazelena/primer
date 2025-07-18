"use client";
import { useState, Fragment } from "react";

import { NavLink } from "@/components/NavLink";

import { Dropdown } from "./Dropdown";
import { HamburgerIcon } from "./HamburgerIcon";

import type { Category } from "@/types/article";
import type { ProductCategory } from "@/types/product";

interface MobileNavProps {
  links: Array<{ id: number; url: string; text: string; newTab: boolean }>;
  categories: {
    productCategories: Array<ProductCategory>;
    blogCategories: Array<Category>;
  };
}

const MobileNav = ({ links, categories }: MobileNavProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");

  return (
    <Fragment>
      <button
        className="lg:hidden"
        onClick={() => setMobileMenuOpen((open) => !open)}
      >
        <HamburgerIcon isOpen={mobileMenuOpen} />
      </button>
      <div
        className={`lg:hidden fixed left-0 ${
          mobileMenuOpen ? "mobile-nav-open" : "mobile-nav-closed"
        }`}
      >
        <div
          className={`fixed  w-full  overflow-y-auto bg-light px-6 py-6 sm:ring-1 sm:ring-inset sm:ring-light/10 border-t-2 border-b-2 border-dark text-lg `}
        >
          <div className="space-y-2 ">
            {links.map((item: NavLink) => {
              if (item.url === "/products") {
                return (
                  <Dropdown
                    key={item.id}
                    title={item.text}
                    categories={categories.productCategories}
                    basePath={item.url}
                    activeMenu={activeMenu}
                    onSetActiveMenu={setActiveMenu}
                    onMobileClose={() => setMobileMenuOpen(false)}
                  />
                );
              }
              if (item.url === "/blog") {
                return (
                  <Dropdown
                    key={item.id}
                    title={item.text}
                    categories={categories.blogCategories}
                    basePath={item.url}
                    activeMenu={activeMenu}
                    onSetActiveMenu={setActiveMenu}
                    onMobileClose={() => setMobileMenuOpen(false)}
                  />
                );
              }
              return (
                <NavLink
                  closeMenu={() => setMobileMenuOpen(false)}
                  key={item.id}
                  {...item}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export { MobileNav };
