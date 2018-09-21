export interface SearchOptions {
    sortField: string;
    sortOrder: string;
    page: number;
    size: number;
    first: number;
    searchValue: string;
}

export interface SearchParamsInterface {
    page?: number;
    size?: number;
    search?: string;
    sort?: string;
}