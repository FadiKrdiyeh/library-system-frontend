import { AxiosResponse } from "axios";
import { ApiResponse } from "../../../core/interfaces/api-response";
import axiosIns from "../../../plugins/axios";
import { Book } from "../book.model";
import { CreateBookRequestBody } from "../models/create-book-request-body.model";
import { GetBooksRequestParams } from "../models/get-books-request-params.model";
import { IBooksRepository } from "./i-books.repository";

export class BooksRepository implements IBooksRepository {
    private readonly _endpoint = 'Books';

    async getBooks(params: GetBooksRequestParams): Promise<AxiosResponse<ApiResponse<Book[]>>> {
        return await axiosIns.get<ApiResponse<Book[]>>(this._endpoint, { params });
    }

    async getBook(id: string): Promise<AxiosResponse<ApiResponse<Book>>> {
        return await axiosIns.get<ApiResponse<Book>>(`${this._endpoint}/GetById/${id}`);
    }
    
    async createBook(book: CreateBookRequestBody): Promise<AxiosResponse<ApiResponse<Book>>> {
        return await axiosIns.post<ApiResponse<Book>>(this._endpoint, book);
    }

    async updateBook(book: Book): Promise<AxiosResponse<ApiResponse<Book>>> {
        return await axiosIns.put<ApiResponse<Book>>(this._endpoint, book);
    }
    
    async deleteBook(id: string): Promise<AxiosResponse<ApiResponse<void>>> {
        return await axiosIns.delete<ApiResponse<void>>(`${this._endpoint}/${id}`);
    }
}