export interface APIResponse<T> {
    data: T;
    meta: Meta
}
export interface Pagination{
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