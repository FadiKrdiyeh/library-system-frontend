import { AxiosResponse } from "axios";
import { ApiResponse } from "../../../core/interfaces/api-response";
import { AuthRepository } from "../data/auth.repository";
import { LoginRequestParams } from "../models/login-request-params.model";
import { LoginResponse } from "../models/login-response.model";

export class LoginUseCase {
    private readonly _authRepository: AuthRepository = new AuthRepository();

    async execute(params: LoginRequestParams): Promise<AxiosResponse<ApiResponse<LoginResponse>>> {
        return this._authRepository.login(params);
    }
}