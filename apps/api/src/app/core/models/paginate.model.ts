export class PagedResult<T> {
    data: T[];
    page: number;
    limit: number;
    totalItems: number;
}

export interface IRequestPaged {
    page: number;
    limit: number;
    search?: string;
}