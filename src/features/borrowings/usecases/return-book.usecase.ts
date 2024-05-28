import { AxiosResponse } from "axios";
import { ApiResponse } from "../../../core/interfaces/api-response";
import { BorrowingsRepository } from "../data/borrowings.repository";

export class ReturnBookUseCase {
    private readonly _borrowingsRepository: BorrowingsRepository = new BorrowingsRepository();

    async execute(borrowingId: string): Promise<AxiosResponse<ApiResponse<void>>> {
        return await this._borrowingsRepository.returnBook(borrowingId);
    }
}
