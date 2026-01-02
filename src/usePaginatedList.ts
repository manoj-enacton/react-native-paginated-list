import { useCallback, useEffect, useRef, useState } from "react";
import { PaginatedResponse, PaginationState } from "./types";

interface Options {
  pageSize?: number;
  initialPage?: number;
  autoLoadFirstPage?: boolean;
}

export function usePaginatedList<T>(
  fetchPage: (page: number, pageSize: number) => Promise<PaginatedResponse<T>>,
  options: Options = {}
) {
  const { pageSize = 10, initialPage = 1, autoLoadFirstPage = true } = options;

  const [data, setData] = useState<T[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    page: initialPage,
    pageSize,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const fetchingRef = useRef(false);

  const hasMore =
    pagination.totalPages !== undefined
      ? pagination.page <= pagination.totalPages
      : pagination.totalCount !== undefined
      ? data.length < pagination.totalCount
      : true;

  const loadNextPage = useCallback(async () => {
    if (fetchingRef.current || !hasMore) return;

    fetchingRef.current = true;
    setIsLoading(true);

    try {
      const res = await fetchPage(pagination.page, pageSize);

      setData((prev) => [...prev, ...res.data]);
      setPagination((prev) => ({
        ...prev,
        page: prev.page + 1,
        totalPages: res.totalPages,
        totalCount: res.totalCount,
      }));
    } catch (e) {
      setError(e);
    } finally {
      fetchingRef.current = false;
      setIsLoading(false);
    }
  }, [fetchPage, pagination.page, pageSize, hasMore]);

  const reset = useCallback(() => {
    setData([]);
    setPagination({ page: initialPage, pageSize });
    setError(null);
  }, [initialPage, pageSize]);

  const refresh = useCallback(async () => {
    reset();
    await loadNextPage();
  }, [reset, loadNextPage]);

  useEffect(() => {
    if (autoLoadFirstPage) {
      loadNextPage();
    }
  }, []);

  return {
    data,
    pagination,
    isLoading,
    error,
    hasMore,
    loadNextPage,
    refresh,
    reset,
  };
}
