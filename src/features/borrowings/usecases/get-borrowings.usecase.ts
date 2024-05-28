import { AxiosResponse } from "axios";
import { ApiResponse } from "../../../core/interfaces/api-response";
import { BorrowingsRepository } from "../data/borrowings.repository";
import { Borrowing } from "../borrowing.model";

export class GetBorrowingsUseCase {
    private readonly _borrowingsRepository: BorrowingsRepository = new BorrowingsRepository();

    async execute(userId: string): Promise<AxiosResponse<ApiResponse<Borrowing[]>>> {
        return await this._borrowingsRepository.getBorrowings(userId);
    }
}
