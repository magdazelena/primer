export interface APIResponse {
    data: unknown[];
    meta: Meta
}
export interface PaginationUtil {
    start: number;
    limit: number;
}
export interface Pagination {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
}

export interface Meta {
	pagination: Pagination;
}