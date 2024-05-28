import { AxiosResponse } from "axios";
import { ApiResponse } from "../../../core/interfaces/api-response";
import { Book } from "../book.model";
import { BooksRepository } from "../data/books.repository";

export class UpdateBookUseCase {
    private readonly _booksRepository: BooksRepository = new BooksRepository();

    async execute(book: Book): Promise<AxiosResponse<ApiResponse<Book>>> {
        return this._booksRepository.updateBook(book);
    }
}