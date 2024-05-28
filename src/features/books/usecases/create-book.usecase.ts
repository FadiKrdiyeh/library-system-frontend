import { AxiosResponse } from "axios";
import { ApiResponse } from "../../../core/interfaces/api-response";
import { Book } from "../book.model";
import { BooksRepository } from "../data/books.repository";
import { CreateBookRequestBody } from "../models/create-book-request-body.model";

export class CreateBookUseCase {
    private readonly _booksRepository: BooksRepository = new BooksRepository();

    async execute(book: CreateBookRequestBody): Promise<AxiosResponse<ApiResponse<Book>>> {
        return this._booksRepository.createBook(book);
    }
}