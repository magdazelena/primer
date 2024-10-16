import { BlocksContent } from "@strapi/blocks-react-renderer";

interface Creator {
    id: number;
    attributes: {
        name: string;
        email: string;
        avatar: {
            data: {
                attributes: {
                    url: string;
                    alt: string;
                }
            }
        },
        bio: BlocksContent,
        slug: string;
        lead: string;
    }
}

export { Creator }