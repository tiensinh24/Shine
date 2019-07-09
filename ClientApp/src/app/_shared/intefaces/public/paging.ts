export interface Paging {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    pageIndex: number;
    nextPageIndex: number;
    previousPageIndex: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}