import { AxiosResponse } from "axios";
import { ApiResponse } from "../../../core/interfaces/api-response";
import { BooksRepository } from "../data/books.repository";

export class DeleteBookUseCase {
    private readonly _booksRepository: BooksRepository = new BooksRepository();

    async execute(id: string): Promise<AxiosResponse<ApiResponse<void>>> {
        return this._booksRepository.deleteBook(id);
    }
}