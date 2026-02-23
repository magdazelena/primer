import Link from "next/link";

import type { BreadcrumbItem } from "@/utils/get-category-breadcrumb-trail";

export const ProductSide = ({
  name,
  retailPrice,
  shortDescription,
  breadcrumbTrail,
}: {
  name: string;
  retailPrice: number | string;
  shortDescription: string;
  breadcrumbTrail?: BreadcrumbItem[];
}) => {
  const effectiveTrail =
    breadcrumbTrail && breadcrumbTrail.length > 0
      ? breadcrumbTrail
      : [{ name: "Products", slug: "" }];

  return (
    <div>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1 text-sm">
          {effectiveTrail.map((item, index) => {
            const href = item.slug ? `/products/${item.slug}` : "/products";
            const isLastCategory = index === effectiveTrail.length - 1;

            return (
              <li key={`${item.slug || "root"}-${index}`} className="flex items-center">
                <Link href={href}>{item.name}</Link>
                <span className="px-1">/</span>
                {isLastCategory && (
                  <span className="sr-only">Current category</span>
                )}
              </li>
            );
          })}
          <li aria-current="page" className="flex items-center">
            <span>{name}</span>
          </li>
        </ol>
      </nav>
      <h1 className="leading-20 text-5xl font-bold font-display">{name}</h1>
      <div className="text-dark px-2">
        <h2 className="text-2xl font-bold py-2">
          {typeof retailPrice === "number"
            ? retailPrice.toFixed(2)
            : retailPrice}
        </h2>
        <div className="flex gap-2 py-5">
          <button className="button primary">Add to basket</button>
          <button className="button secondary">Save to wishlist</button>
        </div>
        <div>{shortDescription}</div>
      </div>
    </div>
  );
};
