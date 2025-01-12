"use client";

import Loader from "@/components/Loader";
import PageHeader from "@/components/PageHeader";
import { Creator } from "@/types/creator";
import { CreatorThumbnailListItem } from "./components/CreatorThumbnailItem";
import { getCreatorsList } from "../../../api/requests/get-creators-list";
import { usePaginatedFetch } from "../../../hooks/usePagination";

export default function Creators() {
  const {
    data: creators,
    hasMore,
    isLoading,
    error,
    loadMore,
  } = usePaginatedFetch({
    fetchFunction: getCreatorsList,
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <PageHeader heading="Creators" text="Meet our creators" />
      <section className="container p-6 mx-auto space-y-6 sm:space-y-12">
        <div className="grid justify-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {creators.map((creator: Creator) => (
            <CreatorThumbnailListItem key={creator.id} creator={creator} />
          ))}
        </div>
        {hasMore && (
          <div className="flex justify-center">
            <button
              type="button"
              className="px-6 py-3 text-sm rounded-lg hover:underline bg-accentDark text-light"
              onClick={loadMore}
            >
              Load more creators...
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
