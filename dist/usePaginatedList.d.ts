import { PaginatedResponse, PaginationState } from "./types";
interface Options {
    pageSize?: number;
    initialPage?: number;
    autoLoadFirstPage?: boolean;
}
export declare function usePaginatedList<T>(fetchPage: (page: number, pageSize: number) => Promise<PaginatedResponse<T>>, options?: Options): {
    data: T[];
    pagination: PaginationState;
    isLoading: boolean;
    error: unknown;
    hasMore: boolean;
    loadNextPage: () => Promise<void>;
    refresh: () => Promise<void>;
    reset: () => void;
};
export {};
