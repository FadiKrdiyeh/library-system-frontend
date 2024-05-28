import { AxiosResponse } from "axios";
import { ApiResponse } from "../../../core/interfaces/api-response";
import { Borrowing } from "../borrowing.model";
import { BorrowBookRequestParams } from "../models/borrow-book-request-params.model";

export interface IBorrowingsRepository {
    getBorrowings(userId: string): Promise<AxiosResponse<ApiResponse<Borrowing[]>>>;
    borrowBook(params: BorrowBookRequestParams): Promise<AxiosResponse<ApiResponse<Borrowing>>>
    returnBook(borrowingId: string): Promise<AxiosResponse<ApiResponse<void>>>
}