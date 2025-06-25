export interface APIResponse {
  data: unknown[];
  meta: Meta;
}
export interface Pagination {
  start: number;
  limit: number;
  total: number;
}
export interface PaginationPerPage {
  page: number;
  pageSize: number;
  pageCount: number;
}

export interface Meta {
  pagination: Pagination;
}
