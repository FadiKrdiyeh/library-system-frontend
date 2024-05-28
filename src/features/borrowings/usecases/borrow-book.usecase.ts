import { AxiosResponse } from "axios";
import { ApiResponse } from "../../../core/interfaces/api-response";
import { BorrowingsRepository } from "../data/borrowings.repository";
import { Borrowing } from "../borrowing.model";
import { BorrowBookRequestParams } from "../models/borrow-book-request-params.model";

export class BorrowBookUseCase {
    private readonly _borrowingsRepository: BorrowingsRepository = new BorrowingsRepository();

    async execute(params: BorrowBookRequestParams): Promise<AxiosResponse<ApiResponse<Borrowing>>> {
        return await this._borrowingsRepository.borrowBook(params);
    }
}
