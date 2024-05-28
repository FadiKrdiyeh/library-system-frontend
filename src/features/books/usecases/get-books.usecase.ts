import { AxiosResponse } from "axios";
import { ApiResponse } from "../../../core/interfaces/api-response";
import { Book } from "../book.model";
import { BooksRepository } from "../data/books.repository";
import { GetBooksRequestParams } from "../models/get-books-request-params.model";

export class GetBooksUseCase {
    private readonly _booksRepository: BooksRepository = new BooksRepository();

    async execute(params: GetBooksRequestParams): Promise<AxiosResponse<ApiResponse<Book[]>>> {
        return await this._booksRepository.getBooks(params);
    }
}
