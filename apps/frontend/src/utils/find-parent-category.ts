import { ProductCategory } from "@/types/product";
import { Category } from "@/types/article";

export function findParentCategory( categories: ProductCategory[] | Category[], current: string) {
    function findImmediateParent(slug: string) {
        const parent = categories.find(category => category.children?.find(child => child.slug === slug));
        if (!parent) return null;
        if (parent.topLevel) return parent;
        return findImmediateParent(parent?.slug);
    }
    

    return findImmediateParent(current);
}