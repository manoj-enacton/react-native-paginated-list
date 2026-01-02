export interface PaginationState {
  page: number;
  pageSize: number;
  totalPages?: number;
  totalCount?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalPages?: number;
  totalCount?: number;
}
