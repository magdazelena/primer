"use client";
import { useState, useEffect, useCallback } from "react";

import Loader from "@/components/Loader";
import List from "./views/product-list";
import PageHeader from "@/components/PageHeader";
import { getProductList } from "@/api/requests/get-product-list";

interface Meta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}

export default function Products() {
  const [meta, setMeta] = useState<Meta | undefined>();
  const [data, setData] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = useCallback(async (start: number, limit: number) => {
    setLoading(true);
    try {
      const { data, meta} = await getProductList(start, limit);

      if (start === 0) {
        setData(data);
      } else {
        setData((prevData: any[]) => [...prevData, ...data]);
      }

      setMeta(meta);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  function loadMorePosts(): void {
    const nextPosts = meta!.pagination.start + meta!.pagination.limit;
    fetchData(nextPosts, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }

  useEffect(() => {
    fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }, [fetchData]);

  if (isLoading) return <Loader />;

  return (
    <div>
      <PageHeader heading="Products" text="Checkout Something Cool" />
      <List products={data}>
        {meta!.pagination.start + meta!.pagination.limit <
          meta!.pagination.total && (
          <div className="flex justify-center">
            <button
              type="button"
              className="px-6 py-3 text-sm rounded-lg hover:underline bg-accentDark text-light"
              onClick={loadMorePosts}
            >
              Load more products...
            </button>
          </div>
        )}
      </List>
    </div>
  );
}
