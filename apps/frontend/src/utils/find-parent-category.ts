import { ProductCategory } from "@/types/product";
import { Category } from "@/types/article";

export function findParentCategory( categories: ProductCategory[] | Category[], current: string) {
    function findImmediateParent(slug: string) {
        const parent = categories.find(category => category.attributes.children?.data.find(child => child.attributes.slug === slug));
        if (!parent) return null;
        if (parent.attributes.topLevel) return parent;
        return findImmediateParent(parent?.attributes.slug);
    }
    

    return findImmediateParent(current);
}