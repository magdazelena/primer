import type { BlocksContent } from "@strapi/blocks-react-renderer";

interface Creator {
  id: number;
  name: string;
  email: string;
  avatar: {
    url: string;
    alt: string;
  };
  bio: BlocksContent;
  slug: string;
  lead: string;
}

export type { Creator };
