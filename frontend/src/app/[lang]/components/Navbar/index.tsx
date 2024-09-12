import Logo from "../Logo";
import { NavLink } from "../NavLink";
import { DesktopMenu } from "./DesktopMenu";
import MobileNav from "./MobileNav";

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
    <div className={`p-4 text-secondary fixed top-0 left-0 w-full nav`}>
      <div className="container flex justify-between h-16 mx-auto px-0 sm:px-6">
        <Logo src={logoUrl}>
          {logoText && (
            <h2 className="text-2xl font-bold text-secondary">{logoText}</h2>
          )}
        </Logo>

        <DesktopMenu links={links} categories={categories} />
        <MobileNav links={links} categories={categories} />
      </div>
    </div>
  );
}
