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
      className={`flex items-center mx-4 mb-2 text-secondary border-b-2 border-transparent  ${
        path.endsWith(url) && "link-active"
      }`}
    >
      {text}
    </Link>
  );
}
