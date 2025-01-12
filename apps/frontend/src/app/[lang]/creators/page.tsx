"use client";
import { useState, useEffect, useCallback } from "react";

import Loader from "@/components/Loader";
import PageHeader from "@/components/PageHeader";
import { Creator } from "@/types/creator";
import { CreatorThumbnailListItem } from "./components/CreatorThumbnailItem";
import { getCreatorsList } from "../../../api/requests/get-creators-list";
import { Meta } from "../../../types/api";



export default function Creators() {
  const [meta, setMeta] = useState<Meta>();
  const [data, setData] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = useCallback(async (start: number, limit: number) => {
    setLoading(true);
    try {
      const { data, meta} = await getCreatorsList(start, limit);
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
      <PageHeader heading="Creators" text="Meet our creators" />
      <section className="container p-6 mx-auto space-y-6 sm:space-y-12">
        <div className="grid justify-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((creator: Creator) => (
            <CreatorThumbnailListItem key={creator.id} creator={creator} />
          ))}
        </div>
        {meta!.pagination.start + meta!.pagination.limit <
          meta!.pagination.total && (
          <div className="flex justify-center">
            <button
              type="button"
              className="px-6 py-3 text-sm rounded-lg hover:underline bg-accentDark text-light"
              onClick={loadMorePosts}
            >
              Load more creators...
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
