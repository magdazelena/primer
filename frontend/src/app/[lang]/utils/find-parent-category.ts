import { ProductCategory } from "@/types/product";

export function findParentCategory( categories: ProductCategory[], current: string) {
    function findImmediateParent(slug: string) {
        const parent = categories.find(category => category.attributes.children?.data.find(child => child.attributes.slug === slug));
        if (!parent) return null;
        if (parent.attributes.topLevel) return parent;
        return findImmediateParent(parent?.attributes.slug);
    }
    

    return findImmediateParent(current);
}