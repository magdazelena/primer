import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavLink {
  id?: number;
  url: string;
  newTab?: boolean;
  text: string;
}

export interface MobileNavLink extends NavLink {
  closeMenu: () => void;
}

export function NavLink({ url, text }: NavLink) {
  const path = usePathname();
  return (
    <li className="flex">
      <Link
        href={url}
        className={`flex items-center mx-4 mb-2 text-secondary border-b-2 border-transparent  ${
          path.endsWith(url) && "link-active"
        }`}
      >
        {text}
      </Link>
    </li>
  );
}

export function MobileNavLink({ url, text, closeMenu }: MobileNavLink) {
  const path = usePathname();
  const handleClick = () => {
    closeMenu();
  };
  return (
    <a className="flex">
      <Link
        href={url}
        onClick={handleClick}
        className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7  ${
          path === url && "link-active"
        }}`}
      >
        {text}
      </Link>
    </a>
  );
}
