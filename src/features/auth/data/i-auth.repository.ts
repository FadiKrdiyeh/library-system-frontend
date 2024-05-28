import { AxiosResponse } from "axios";
import { ApiResponse } from "../../../core/interfaces/api-response";
import { LoginRequestParams } from "../models/login-request-params.model";
import { LoginResponse } from "../models/login-response.model";
import { RegisterRequestParams } from "../models/register-request-params.model";

export interface IAuthRepository {
    login(params: LoginRequestParams): Promise<AxiosResponse<ApiResponse<LoginResponse>>>;
    register(params: RegisterRequestParams): Promise<AxiosResponse<ApiResponse<LoginResponse>>>;
}
