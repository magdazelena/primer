"use client";

import Loader from "@/components/Loader";
import Blog from "./views/article-list";
import PageHeader from "@/components/PageHeader";
import { usePaginatedFetch } from "@/hooks/usePagination";
import { getArticlesList } from "@/api/requests/get-articles-list";


export default function Profile() {
  const {
    data: articles,
    hasMore,
    isLoading,
    error,
    loadMore,
  } = usePaginatedFetch({
    fetchFunction: getArticlesList,
  });

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <PageHeader heading="Our Blog" text="Checkout Something Cool" />
      <Blog data={articles}>
        {hasMore && (
          <div className="flex justify-center">
            <button
              type="button"
              className="px-6 py-3 text-sm rounded-lg hover:underline bg-gray-900 text-gray-400"
              onClick={loadMore}
            >
              Load more posts...
            </button>
          </div>
        )}
      </Blog>
    </div>
  );
}
