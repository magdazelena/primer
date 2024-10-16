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
    <div className={`p-4 text-dark fixed top-0 left-0 w-full nav`}>
      <div className="container flex justify-between h-16 mx-auto px-0 sm:px-6">
        <Logo src={logoUrl}>
          {logoText && (
            <h2 className="text-2xl text-dark font-display">{logoText}</h2>
          )}
        </Logo>

        <DesktopNav links={links} categories={categories} />
        <MobileNav links={links} categories={categories} />
      </div>
    </div>
  );
}
