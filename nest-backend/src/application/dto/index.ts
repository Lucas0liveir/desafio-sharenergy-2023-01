export interface Pagination {
    skip: number;
    take: number
}

export interface WhereInput {
    name: string;
    userId: string
}

export interface Response<T> {
    data: T[];
    total: number
}