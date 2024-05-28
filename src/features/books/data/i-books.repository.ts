import { AxiosResponse } from "axios";
import { ApiResponse } from "../../../core/interfaces/api-response";
import { Book } from "../book.model";
import { GetBooksRequestParams } from "../models/get-books-request-params.model";

export interface IBooksRepository {
    getBooks(params: GetBooksRequestParams): Promise<AxiosResponse<ApiResponse<Book[]>>>;
    getBook(id: string): Promise<AxiosResponse<ApiResponse<Book>>>;
    createBook(book: Book): Promise<AxiosResponse<ApiResponse<Book>>>;
    updateBook(book: Book): Promise<AxiosResponse<ApiResponse<Book>>>;
    deleteBook(id: string): Promise<AxiosResponse<ApiResponse<void>>>;
}
