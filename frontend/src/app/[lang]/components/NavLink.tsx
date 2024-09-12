import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavLink extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  url: string;
  text: string;
}

export interface MobileNavLink extends NavLink {
  closeMenu: () => void;
}

export function NavLink({ url, text, ...props }: NavLink) {
  const path = usePathname();
  return (
    <Link
      {...props}
      href={url}
      className={`flex items-center mx-4 mb-2 text-secondary border-b-2 border-transparent  ${
        path.endsWith(url) && "link-active"
      }`}
    >
      {text}
    </Link>
  );
}

export function MobileNavLink({ url, text, closeMenu }: MobileNavLink) {
  const path = usePathname();
  const handleClick = () => {
    closeMenu();
  };
  return (
    <span className="flex">
      <Link
        href={url}
        onClick={handleClick}
        className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  ${
          path === url && "link-active"
        }}`}
      >
        {text}
      </Link>
    </span>
  );
}
