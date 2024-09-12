"use client";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { NavLink, MobileNavLink } from "../NavLink";
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
  const closeMenu = () => {
    setMobileMenuOpen(false);
  };
  return (
    <Fragment>
      <button className="p-4 lg:hidden" onClick={() => setMobileMenuOpen(true)}>
        <Bars3Icon className="h-7 w-7 text-secondary" aria-hidden="true" />
      </button>
      <div
        className={`lg:hidden fixed left-0 ${
          mobileMenuOpen ? "mobile-nav-open" : "mobile-nav-closed"
        }`}
      >
        <div
          className={`fixed z-500 w-full overflow-y-auto bg-primary px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-inset sm:ring-white/10 `}
        >
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-secondary">
              <div className="space-y-2 py-6">
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
                    <MobileNavLink
                      closeMenu={closeMenu}
                      key={item.id}
                      {...item}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
