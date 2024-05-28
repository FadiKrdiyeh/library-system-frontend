import { AxiosResponse } from "axios";
import { ApiResponse } from "../../../core/interfaces/api-response";
import { AuthRepository } from "../data/auth.repository";
import { LoginResponse } from "../models/login-response.model";
import { RegisterRequestParams } from "../models/register-request-params.model";

export class RegisterUseCase {
    private readonly _authRepository: AuthRepository = new AuthRepository();

    async execute(params: RegisterRequestParams): Promise<AxiosResponse<ApiResponse<LoginResponse>>> {
        return this._authRepository.register(params);
    }
}