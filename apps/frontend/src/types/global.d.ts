


// Global configuration interfaces
interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

interface Image {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface Logo {
  id: number;
  logoText: string | null;
  logoImg: Image;
}

interface MenuItem {
  id: number;
  url: string;
  newTab?: boolean;
  text: string;
}

interface Navbar {
  id: number;
  navbarLogo: Logo;
  menuItems: any[];
}

interface Footer {
  id: number;
  footerLogo: Logo | null;
  menuLinks: any[];
  legalLinks: any[];
  socialLinks: any[];
  categories: any[];
}

interface Metadata {
  id: number;
  metaTitle: string;
  metaDescription: string;
}

interface GlobalData {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  metadata: Metadata;
  navbar: Navbar;
  footer: Footer;
  favicon: Image;
}

interface Global {
  data: GlobalData;
  meta: Record<string, any>;
}
export type { Global, Navbar, MenuItem };