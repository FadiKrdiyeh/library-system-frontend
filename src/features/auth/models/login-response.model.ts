import { User } from "../../users/user.model";
import { Token } from "./token.model";

export interface LoginResponse {
    token: Token;
    user: User;
}
