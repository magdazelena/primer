"use client";

import { getArticlesList } from "@/api/requests/get-articles-list";
import { Loader } from "@/components/Loader";
import { PageHeader } from "@/components/PageHeader";
import { usePaginatedFetch } from "@/hooks/usePagination";

import { PostList } from "./views/article-list";
import type { Article } from "@/types/article";

const Profile = () => {
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
      <PostList data={articles as Article[]}>
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
      </PostList>
    </div>
  );
};

export default Profile;