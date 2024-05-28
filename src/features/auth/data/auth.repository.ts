import { AxiosResponse } from "axios";
import { ApiResponse } from "../../../core/interfaces/api-response";
import axiosIns from "../../../plugins/axios";
import { LoginRequestParams } from "../models/login-request-params.model";
import { LoginResponse } from "../models/login-response.model";
import { IAuthRepository } from "./i-auth.repository";
import { RegisterRequestParams } from "../models/register-request-params.model";

export class AuthRepository implements IAuthRepository {
    private readonly _endpoint = 'Account';

    async login(params: LoginRequestParams): Promise<AxiosResponse<ApiResponse<LoginResponse>>> {
        return await axiosIns.post<ApiResponse<LoginResponse>>(`${this._endpoint}/Login`, params);
    }

    async register(params: RegisterRequestParams): Promise<AxiosResponse<ApiResponse<LoginResponse>>> {
        return await axiosIns.post<ApiResponse<LoginResponse>>(`${this._endpoint}/Register`, params);
    }
}