"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavLink extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  url: string;
  text: string;
  closeMenu?: () => void;
}

export function NavLink({ url, text, closeMenu, ...props }: NavLink) {
  const path = usePathname();
  const handleClick = () => {
    if (closeMenu) closeMenu();
  };
  return (
    <Link
      {...props}
      href={url}
      onClick={handleClick}
      className={`flex items-center text-dark ${
        path.endsWith(url) && "link-active"
      }`}
    >
      {text}
    </Link>
  );
}
