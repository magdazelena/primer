"use client";

import { getProductList } from "@/api/requests/get-product-list";
import Loader from "@/components/Loader";
import PageHeader from "@/components/PageHeader";

import { usePaginatedFetch } from "../../../hooks/usePagination";

import List from "./views/product-list";

export const Products = () => {
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
              className="px-6 py-3 text-sm rounded-lg hover:underline bg-accentDark text-light"
              onClick={loadMore}
            >
              Load more products...
            </button>
          </div>
        )}
      </List>
    </div>
  );
};
