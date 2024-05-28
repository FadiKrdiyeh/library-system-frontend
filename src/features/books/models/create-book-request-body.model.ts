export interface CreateBookRequestBody {
    isbn: string;
    title: string;
    description?: string;
    availability?: boolean;
    author: string;
}
