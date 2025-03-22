"use client";
import { Fragment, useState } from "react";
import Dropdown from "./Dropdown";
import { NavLink } from "@/components/NavLink";
import HamburgerIcon from "./HamburgerIcon";

const MobileNav = ({
  links,
  categories,
}: {
  links: Array<NavLink>;
  categories: { productCategories: Array<any>; blogCategories: Array<any> };
}) => {
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
        className={`fixed left-0 lg:hidden ${
          mobileMenuOpen ? "mobile-nav-open" : "mobile-nav-closed"
        }`}
      >
        <div
          className={`fixed  w-full  overflow-y-auto border-y-2 border-dark bg-light p-6 text-lg sm:ring-1 sm:ring-inset sm:ring-light/10 `}
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
