import { findParentCategory } from "@/utils/find-parent-category";

import type { ProductCategory } from "@/types/product";

type BreadcrumbItem = {
  name: string;
  slug: string;
};

function findCategoryBySlug(
  categories: ProductCategory[],
  slug: string,
): ProductCategory | null {
  for (const category of categories) {
    if (category.slug === slug) return category;
    if (category.children && category.children.length > 0) {
      const found = findCategoryBySlug(category.children, slug);
      if (found) return found;
    }
  }
  return null;
}

export function getCategoryBreadcrumbTrail(
  categories: ProductCategory[],
  currentSlug: string,
  currentName?: string,
): BreadcrumbItem[] {
  if (!currentSlug) return [];

  const ancestors: ProductCategory[] = [];
  const visited = new Set<string>();
  let slug = currentSlug;

  while (true) {
    if (visited.has(slug)) break;
    visited.add(slug);

    const parent = findParentCategory(categories, slug);
    if (!parent) break;

    ancestors.unshift(parent);
    slug = parent.slug;

    if (parent.topLevel) break;
  }

  const items: BreadcrumbItem[] = ancestors.map((category) => ({
    name: category.name,
    slug: category.slug,
  }));

  const existingCategory = findCategoryBySlug(categories, currentSlug);
  const finalName =
    currentName || existingCategory?.name || currentSlug || "Category";

  items.push({
    name: finalName,
    slug: currentSlug,
  });

  return items;
}

export type { BreadcrumbItem };

