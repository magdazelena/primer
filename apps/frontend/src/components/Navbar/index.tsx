import Logo from "../Logo";

import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

import type { NavLink } from "../NavLink";

interface NavbarProps {
  links: Array<NavLink>;
  logoUrl: string | null;
  logoText: string | null;
  categories: { productCategories: Array<any>; blogCategories: Array<any> };
}

export const Navbar = (props: NavbarProps) => {
  return (
    <div className={`p-4 text-dark fixed top-0 left-0 w-full nav`}>
      <div className="container flex justify-between h-16 mx-auto px-0 sm:px-6">
        <Logo src={props.logoUrl}>
          {props.logoText && (
            <h2 className="text-2xl text-dark font-display">
              {props.logoText}
            </h2>
          )}
        </Logo>

        <DesktopNav links={props.links} categories={props.categories} />
        <MobileNav links={props.links} categories={props.categories} />
      </div>
    </div>
  );
};
