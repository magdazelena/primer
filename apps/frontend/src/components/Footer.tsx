"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";
import { CgWebsite } from "react-icons/cg";
import { FaDiscord } from "react-icons/fa";

import { Logo } from "./Logo";

interface FooterLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
  social?: string;
}

interface CategoryLink {
  id: string;
  attributes: {
    name: string;
    slug: string;
  };
}

const FooterLink = ({ url, text }: FooterLink) => {
  const path = usePathname();
  return (
    <li className="flex">
      <Link
        href={url}
        className={`hover:text-dark ${
          path === url && "text-dark border-accentDark"
        }}`}
      >
        {text}
      </Link>
    </li>
  );
};

const CategoryLink = ({ attributes }: CategoryLink) => {
  return (
    <li className="flex">
      <Link href={`/blog/${attributes.slug}`}>{attributes.name}</Link>
    </li>
  );
};

const RenderSocialIcon = ({ social }: { social: string | undefined }) => {
  switch (social) {
    case "WEBSITE":
      return <CgWebsite />;
    case "TWITTER":
      return <AiFillTwitterCircle />;
    case "YOUTUBE":
      return <AiFillYoutube />;
    case "DISCORD":
      return <FaDiscord />;
    default:
      return null;
  }
};

interface FooterProps {
  logoUrl: string | null;
  logoText: string | null;
  menuLinks: Array<FooterLink>;
  categoryLinks: Array<CategoryLink>;
  legalLinks: Array<FooterLink>;
  socialLinks: Array<FooterLink>;
}

export const Footer = ({
  logoUrl,
  logoText,
  menuLinks,
  categoryLinks,
  legalLinks,
  socialLinks,
}: FooterProps) => {
  return (
    <footer className="py-6 text-dark">
      <div className="container px-6 mx-auto space-y-6 divide-y divide-dark md:space-y-12 divide-opacity-50">
        <div className="grid grid-cols-12">
          <div className="pb-6 col-span-full md:pb-0 md:col-span-6">
            <Logo src={logoUrl}>
              {logoText && (
                <h2 className="text-2xl font-bold text-dark">{logoText}</h2>
              )}
            </Logo>
          </div>

          {/* <div className="col-span-6 text-center md:text-left md:col-span-3">
            <p className="pb-1 text-lg font-medium">Categories</p>
            <ul>
              {categoryLinks.map((link: CategoryLink) => (
                <CategoryLink key={link.id} {...link} />
              ))}
            </ul>
          </div> */}

          <div className="col-span-6 text-center md:text-left md:col-span-3">
            <p className="pb-1 text-lg font-medium">Menu</p>
            <ul>
              {menuLinks.map((link: FooterLink) => (
                <FooterLink key={link.id} {...link} />
              ))}
            </ul>
          </div>
        </div>
        <div className="grid justify-center pt-6 lg:justify-between">
          <div className="flex">
            <span className="mr-2">
              ©{new Date().getFullYear()} All rights reserved
            </span>
            <ul className="flex">
              {legalLinks.map((link: FooterLink) => (
                <Link href={link.url} key={link.id}>
                  {link.text}
                </Link>
              ))}
            </ul>
          </div>
          <div className="flex justify-center pt-4 space-x-4 lg:pt-0 lg:col-end-13">
            {socialLinks.map((link: FooterLink) => {
              return (
                <a
                  key={link.id}
                  rel="noopener noreferrer"
                  href={link.url}
                  title={link.text}
                  target={link.newTab ? "_blank" : "_self"}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-accentDark text-dark"
                >
                  <RenderSocialIcon social={link.social} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};
