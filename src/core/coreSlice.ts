import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type SnackbarTypes = 'success' | 'error' | 'warning' | 'info' | undefined;

type SnackbarSettings = {
    show?: boolean;
    message?: string | undefined;
    type?: SnackbarTypes;
    duration?: number;
};

type SnackbarParams = {
    message: string;
    duration?: number;
};

interface CoreState {
    snackbarStatus: boolean;
    snackbar: SnackbarSettings;
}

const initialState: CoreState = {
    snackbarStatus: false,
    snackbar: {
        show: false,
        message: undefined,
        type: undefined,
        duration: 3000,
    }
}

const coreSlice = createSlice({
    name: 'core',
    initialState,
    reducers: {
        showSuccess(state, action: PayloadAction<SnackbarParams>) {
            state.snackbar.show = true;
            state.snackbar.type = 'success';
            state.snackbar.message = action.payload.message;
            state.snackbar.duration = action.payload.duration || 3000;
        },
        showError(state, action: PayloadAction<SnackbarParams>) {
            state.snackbar.show = true;
            state.snackbar.type = 'error';
            state.snackbar.message = action.payload.message;
            state.snackbar.duration = action.payload.duration || 3000;
        },
        showWarning(state, action: PayloadAction<SnackbarParams>) {
            state.snackbar.show = true;
            state.snackbar.type = 'warning';
            state.snackbar.message = action.payload.message;
            state.snackbar.duration = action.payload.duration || 3000;
        },
        showInfo(state, action: PayloadAction<SnackbarParams>) {
            state.snackbar.show = true;
            state.snackbar.type = 'info';
            state.snackbar.message = action.payload.message;
            state.snackbar.duration = action.payload.duration || 3000;
        },
        hideSnackbar(state, action: PayloadAction<{ reset?: boolean }>) {
            state.snackbar.show = false;

            if (action.payload.reset) {
                state.snackbar.type = undefined;
                state.snackbar.message = undefined;
                state.snackbar.duration = 3000;
            }
        },
    },
});

export const {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    hideSnackbar,
} = coreSlice.actions;

export default coreSlice.reducer;
