import type { Category } from "@/types/article";
import type { ProductCategory } from "@/types/product";

export function findParentCategory(
  categories: ProductCategory[] | Category[],
  current: string,
) {
  function findImmediateParent(slug: string) {
    const parent = categories.find((category) =>
      category.children?.find((child) => child.slug === slug),
    );
    if (!parent) return null;
    if (parent.topLevel) return parent;
    return findImmediateParent(parent?.slug);
  }

  return findImmediateParent(current);
}
