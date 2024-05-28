
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { showError, showSuccess } from "../../core/coreSlice";
import { Borrowing } from "./borrowing.model";
import { GetBorrowingsUseCase } from "./usecases/get-borrowings.usecase";
import { updateBookAvailability } from "../books/booksSlice";
import { BorrowBookUseCase } from "./usecases/borrow-book.usecase";
import { User } from "../users/user.model";
import { ReturnBookUseCase } from "./usecases/return-book.usecase";

type BorrowingsLoaders = {
    fetch: boolean;
    borrowBorrowing: boolean;
    returnReturn: boolean;
}

type BorrowingsIndexedLoaders = {
    borrowBook: { [key: string]: boolean }
    returnBook: { [key: string]: boolean }
}

interface BorrowingsState {
    borrowings: Borrowing[];
    loaders: BorrowingsLoaders;
    indexedLoaders: BorrowingsIndexedLoaders;
}

const initialState: BorrowingsState = {
    borrowings: [],
    loaders: {
        fetch: false,
        borrowBorrowing: false,
        returnReturn: false,
    },
    indexedLoaders: {
        borrowBook: {},
        returnBook: {},
    },
}

const borrowingsSlice = createSlice({
    name: 'borrowings',
    initialState,
    reducers: {
        setLoader(state, action: PayloadAction<{ type: keyof BorrowingsLoaders, value: boolean }>) {
            state.loaders[action.payload.type] = action.payload.value;
        },
        setIndexedLoader(state, action: PayloadAction<{ type: keyof BorrowingsIndexedLoaders, value: boolean, index: string }>) {
            state.indexedLoaders[action.payload.type][action.payload.index] = action.payload.value;
        },

        // ? Fetch Borrowings Reducers
        getBorrowingsSuccess(state, action: PayloadAction<Borrowing[]>) {
            state.borrowings = action.payload;
        },

        // ? Return Book Reducers
        returnBookSuccess(state, action: PayloadAction<string>) {
            const borrowingIndex = state.borrowings.findIndex((borrowing) => borrowing.id === action.payload);

            console.log(action.payload, borrowingIndex);

            if (borrowingIndex > -1)
                state.borrowings.splice(borrowingIndex, 1);
        },
    },
});

export const {
    setLoader,
    setIndexedLoader,
    getBorrowingsSuccess,
    returnBookSuccess,
} = borrowingsSlice.actions;

export const fetchBorrowings = createAsyncThunk<void, string, {}>(
    'Borrowings/fetchAll',
    async (userId: string, { dispatch }) => {
        try {
            dispatch(setLoader({ type: 'fetch', value: true }));
            const usecase: GetBorrowingsUseCase = new GetBorrowingsUseCase();
            const response = await usecase.execute(userId);

            console.log('Fetch Borrowings Response: ', response);

            if (response.status === 200 && response.data.status)
                dispatch(getBorrowingsSuccess(response.data.data));
            else
                dispatch(showError({ message: response.data.message || 'Failed to fetch borrowings!' }));
        } catch (error: any) {
            if (error.code === 'ERR_NETWORK')
                dispatch(showError({ message: 'Check your internet connection and try again!' }));
            else
                dispatch(showError({ message: 'Something went wrong!' }));
        } finally {
            dispatch(setLoader({ type: 'fetch', value: false }));
        }
    }
);

export const borrowBook = createAsyncThunk<void, string, {}>(
    'Borrowings/borrowBook',
    async (bookId: string, { dispatch }) => {
        try {
            dispatch(setIndexedLoader({ type: 'borrowBook', value: true, index: bookId }));
            const usecase: BorrowBookUseCase = new BorrowBookUseCase();
            // const user = JSON.parse(local)

            const userId = (JSON.parse(localStorage.getItem('user') || 'null') as User).id;
            const response = await usecase.execute({ bookId: bookId, userId: userId });

            console.log('Borrow Book Response: ', response);

            if (response.status === 200 && response.data.status) {
                dispatch(updateBookAvailability({ bookId: response.data.data.bookId, availability: false }));
                dispatch(showSuccess({ message: 'Book borrowed successfully!' }));
            }
            else {
                dispatch(showError({ message: response.data.message || 'Failed to borrow book!' }));
            }
        } catch (error: any) {
            console.error(error)

            if (error.code === 'ERR_NETWORK')
                dispatch(showError({ message: 'Check your internet connection and try again!' }));
            else
                dispatch(showError({ message: 'Something went wrong!' }));
        } finally {
            dispatch(setIndexedLoader({ type: 'borrowBook', value: false, index: bookId }));
        }
    }
);

export const returnBook = createAsyncThunk<void, string, {}>(
    'Borrowings/returnBook',
    async (borrowingId: string, { dispatch }) => {
        try {
            dispatch(setIndexedLoader({ type: 'returnBook', value: true, index: borrowingId }));
            const usecase: ReturnBookUseCase = new ReturnBookUseCase();
            const response = await usecase.execute(borrowingId);

            console.log('Borrow Book Response: ', response);

            if (response.status === 200 && response.data.status) {
                dispatch(returnBookSuccess(borrowingId));
                dispatch(showSuccess({ message: 'Book returned successfully!' }));
            } else {
                dispatch(showError({ message: response.data.message || 'Failed to return book!' }));
            }
        } catch (error: any) {
            if (error.code === 'ERR_NETWORK')
                dispatch(showError({ message: 'Check your internet connection and try again!' }));
            else
                dispatch(showError({ message: 'Something went wrong!' }));
            console.error(error)
        } finally {
            dispatch(setIndexedLoader({ type: 'returnBook', value: false, index: borrowingId }));
        }
    }
);

export default borrowingsSlice.reducer;

