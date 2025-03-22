"use client";

import Loader from "@/components/Loader";
import List from "./views/product-list";
import PageHeader from "@/components/PageHeader";
import { getProductList } from "@/api/requests/get-product-list";
import { usePaginatedFetch } from "../../../hooks/usePagination";


export default function Products() {
  const {
    data: products,
    hasMore,
    isLoading,
    error,
    loadMore,
  } = usePaginatedFetch({
    fetchFunction: getProductList,
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <PageHeader heading="Products" text="Checkout Something Cool" />
      <List products={products}>
        {hasMore && (
          <div className="flex justify-center">
            <button
              type="button"
              className="rounded-lg bg-accentDark px-6 py-3 text-sm text-light hover:underline"
              onClick={loadMore}
            >
              Load more products...
            </button>
          </div>
        )}
      </List>
    </div>
  );
}
