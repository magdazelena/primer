import { useState, useEffect, useCallback } from "react";

interface PaginationMeta {
    start: number;
    limit: number;
    total: number;
}

interface UsePaginatedFetchOptions {
    initialLimit?: number;
    fetchFunction: (start: number, limit: number) => Promise<{ data: any[]; meta: { pagination: PaginationMeta } }>;
}



export function usePaginatedFetch({ initialLimit = Number(process.env.NEXT_PUBLIC_PAGE_LIMIT), fetchFunction }: UsePaginatedFetchOptions) {
    const initalPagination = {
        start: 0,
        limit: initialLimit,
        total: initialLimit
    }
    const [data, setData] = useState<any[]>([]);
    const [pagination, setPagination] = useState<PaginationMeta>(initalPagination);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(
        async (start: number, limit: number) => {
            setLoading(true);
            setError(null);
            try {
                const { data: fetchedData, meta } = await fetchFunction(start, limit);
                if (start === 0) {
                    setData(fetchedData);
                } else {
                    setData((prevData) => [...prevData, ...fetchedData]);
                }
                setPagination(meta.pagination);
                if (!meta.pagination) return setHasMore(false);
                const nextStart = meta.pagination.start + meta.pagination.limit;
                setPagination((prev) => ({ ...prev, start: nextStart }))
                setHasMore(nextStart < meta.pagination.total);

            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        },
        [fetchFunction]
    );

    const loadMore = useCallback(() => {
        if (hasMore) {
            fetchData(pagination.start, pagination.limit);
        }
    }, [fetchData, pagination, hasMore]);

    useEffect(() => {
        fetchData(0, initialLimit);
    }, [fetchData, initialLimit]);

    return { data, pagination, hasMore, isLoading, error, loadMore };
}
