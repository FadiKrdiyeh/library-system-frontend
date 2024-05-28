import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { showError, showSuccess } from "../../core/coreSlice";
import { LoginRequestParams } from "./models/login-request-params.model";
import { LoginUseCase } from "./usecases/login.usecase";
import { User } from "../users/user.model";
import { Token } from "./models/token.model";
import { LoginResponse } from "./models/login-response.model";
import { RegisterUseCase } from "./usecases/register.usecase";
import { RegisterRequestParams } from "./models/register-request-params.model";

type AuthLoaders = {
    login: boolean;
    register: boolean;
}

interface AuthState {
    user: User | null;
    token: Token | null;
    loaders: AuthLoaders;
}

const initialState: AuthState = {
    user: null,
    token: null,
    loaders: {
        login: false,
        register: false,
    },
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setLoader(state, action: PayloadAction<{ type: keyof AuthLoaders, value: boolean }>) {
            state.loaders[action.payload.type] = action.payload.value;
        },

        // ? Login Reducers
        loginSuccess(state, actions: PayloadAction<LoginResponse>) {
            state.user = actions.payload.user;
            state.token = actions.payload.token;
        },

        // ? Logout Reducers
        logoutSuccess(state) {
            state.user = null;
            state.token = null;
        },
    },
});

export const {
    setLoader,
    loginSuccess,
    logoutSuccess,
} = authSlice.actions;

export const login = createAsyncThunk<void, LoginRequestParams, {}>(
    'auth/login',
    async (params: LoginRequestParams, { dispatch }) => {
        try {
            dispatch(setLoader({ type: 'login', value: true }));
            const usecase: LoginUseCase = new LoginUseCase();
            const response = await usecase.execute(params);

            console.log('Login Response: ', response);

            if (response.status === 200 && response.data.status) {
                localStorage.setItem('token', response.data.data.token.token);
                localStorage.setItem('expireIn', response.data.data.token.expireIn);
                localStorage.setItem('user', JSON.stringify(response.data.data.user));

                dispatch(loginSuccess(response.data.data));
                dispatch(showSuccess({ message: 'Logged in successfully!' }));
            } else {
                dispatch(showError({ message: response.data.message || 'Failed to login!' }));
            }

        } catch (error: any) {
            console.error(error);

            if (error.code === 'ERR_NETWORK')
                dispatch(showError({ message: 'Check your internet connection and try again!' }));
            else if (error.response?.status === 401)
                dispatch(showError({ message: 'Username or password is invalid!' }));
            else
                dispatch(showError({ message: 'Something went wrong!' }));
        } finally {
            dispatch(setLoader({ type: 'login', value: false }));
        }
    }
);

export const register = createAsyncThunk<void, RegisterRequestParams, {}>(
    'auth/register',
    async (params: RegisterRequestParams, { dispatch }) => {
        try {
            dispatch(setLoader({ type: 'register', value: true }));
            const usecase: RegisterUseCase = new RegisterUseCase();
            const response = await usecase.execute(params);

            console.log('Register Response: ', response);

            if (response.status === 200 && response.data.status) {
                localStorage.setItem('token', response.data.data.token.token);
                localStorage.setItem('expireIn', response.data.data.token.expireIn);
                localStorage.setItem('user', JSON.stringify(response.data.data.user));

                dispatch(loginSuccess(response.data.data));
                dispatch(showSuccess({ message: 'Uesr registered successfully!' }));
            } else {
                dispatch(showError({ message: response.data.message || 'Failed to register!' }));
            }

        } catch (error: any) {
            console.error(error);

            if (error.code === 'ERR_NETWORK')
                dispatch(showError({ message: 'Check your internet connection and try again!' }));
            else
                dispatch(showError({ message: 'Something went wrong!' }));
        } finally {
            dispatch(setLoader({ type: 'register', value: false }));
        }
    }
);

export const logout = createAsyncThunk<void, undefined, {}>(
    'auth/login',
    async (_, { dispatch }) => {
        localStorage.removeItem('token');
        localStorage.removeItem('expireIn');
        localStorage.removeItem('user');

        dispatch(logoutSuccess());

        // console.log('test')
        // const navigate = useNavigate();

        // navigate('auth/login');
    }
);

export default authSlice.reducer;
