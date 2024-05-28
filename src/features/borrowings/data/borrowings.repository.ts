import { AxiosResponse } from "axios";
import { IBorrowingsRepository } from "./i-borrowings.repository";
import { ApiResponse } from "../../../core/interfaces/api-response";
import { Borrowing } from "../borrowing.model";
import axiosIns from "../../../plugins/axios";
import { BorrowBookRequestParams } from "../models/borrow-book-request-params.model";

export class BorrowingsRepository implements IBorrowingsRepository {
    private readonly _endpoint = 'Borrowings';

    async getBorrowings(userId: string): Promise<AxiosResponse<ApiResponse<Borrowing[]>>> {
        return await axiosIns.get<ApiResponse<Borrowing[]>>(`${this._endpoint}/GetByUserId/${userId}`);
    }

    async borrowBook(params: BorrowBookRequestParams): Promise<AxiosResponse<ApiResponse<Borrowing>>> {
        return await axiosIns.post<ApiResponse<Borrowing>>(`${this._endpoint}/BorrowBook`, params);
    }

    async returnBook(borrowingId: string): Promise<AxiosResponse<ApiResponse<void>>> {
        return await axiosIns.delete<ApiResponse<void>>(`${this._endpoint}/ReturnBook/${borrowingId}`);
    }
}