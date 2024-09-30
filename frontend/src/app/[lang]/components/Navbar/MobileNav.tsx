"use client";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { NavLink } from "../NavLink";
import CategoriesMenu from "../CategoriesMenu";

export default function MobileNav({
  links,
  categories,
}: {
  links: Array<NavLink>;
  categories: { productCategories: Array<any>; blogCategories: Array<any> };
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");

  return (
    <Fragment>
      <button
        className="p-4 lg:hidden"
        onClick={() => setMobileMenuOpen((open) => !open)}
      >
        <span className="sr-only">Open/close menu</span>
        <Bars3Icon className="h-7 w-7 text-secondary" aria-hidden="true" />
      </button>
      <div
        className={`lg:hidden fixed left-0 ${
          mobileMenuOpen ? "mobile-nav-open" : "mobile-nav-closed"
        }`}
      >
        <div
          className={`fixed  w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-inset sm:ring-white/10 border-t-2 border-b-2 border-secondary text-lg `}
        >
          <div className="space-y-2 ">
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
                    onMobileClose={() => setMobileMenuOpen(false)}
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
}
