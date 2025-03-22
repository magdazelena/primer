import Logo from "../Logo";
import { NavLink } from "../NavLink";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

export default function Navbar({
  links,
  logoUrl,
  logoText,
  categories,
}: {
  links: Array<NavLink>;
  logoUrl: string | null;
  logoText: string | null;
  categories: { productCategories: Array<any>; blogCategories: Array<any> };
}) {
  return (
    <div className={`nav fixed left-0 top-0 w-full p-4 text-dark`}>
      <div className="container mx-auto flex h-16 justify-between px-0 sm:px-6">
        <Logo src={logoUrl}>
          {logoText && (
            <h2 className="font-display text-2xl text-dark">{logoText}</h2>
          )}
        </Logo>

        <DesktopNav links={links} categories={categories} />
        <MobileNav links={links} categories={categories} />
      </div>
    </div>
  );
}
