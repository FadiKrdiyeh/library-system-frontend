import { AxiosResponse } from "axios";
import { ApiResponse } from "../../../core/interfaces/api-response";
import { Book } from "../book.model";
import { BooksRepository } from "../data/books.repository";

export class GetBookUseCase {
    private readonly _booksRepository: BooksRepository = new BooksRepository();

    async execute(id: string): Promise<AxiosResponse<ApiResponse<Book>>> {
        return this._booksRepository.getBook(id);
    }
}