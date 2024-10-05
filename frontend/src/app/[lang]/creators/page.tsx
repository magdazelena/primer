"use client";
import { useState, useEffect, useCallback } from "react";
import { fetchAPI } from "../utils/fetch-api";

import Loader from "../components/Loader";
import PageHeader from "../components/PageHeader";
import { Creator } from "../../../types/creator";
import { CreatorThumbnailListItem } from "../components/CreatorThumbnailItem";

interface Meta {
  pagination: {
    start: number;
    limit: number;
    total: number;
  };
}

export default function Creators() {
  const [meta, setMeta] = useState<Meta | undefined>();
  const [data, setData] = useState<any>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = useCallback(async (start: number, limit: number) => {
    setLoading(true);
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
      const path = `/creators`;
      const urlParamsObject = {
        sort: { createdAt: "desc" },
        populate: {
          avatar: { fields: ["url"] },
          name: { populate: true },
        },
        pagination: {
          start: start,
          limit: limit,
        },
      };
      const options = { headers: { Authorization: `Bearer ${token}` } };
      const responseData = await fetchAPI(path, urlParamsObject, options);

      if (start === 0) {
        setData(responseData.data);
      } else {
        setData((prevData: any[]) => [...prevData, ...responseData.data]);
      }

      setMeta(responseData.meta);
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
              className="px-6 py-3 text-sm rounded-lg hover:underline bg-accent text-primary"
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
