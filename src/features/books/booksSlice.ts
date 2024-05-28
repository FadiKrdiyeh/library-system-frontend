import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Book } from "./book.model";
import { GetBooksUseCase } from "./usecases/get-books.usecase";
import { GetBooksRequestParams } from "./models/get-books-request-params.model";
import { showError } from "../../core/coreSlice";

type BooksLoaders = {
    fetch: boolean;
    find: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
}

interface BooksState {
    books: Book[];
    loaders: BooksLoaders;
    error?: string;
}

const initialState: BooksState = {
    books: [],
    loaders: {
        fetch: false,
        find: false,
        create: false,
        update: false,
        delete: false,
    },
    error: undefined,
}

const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        setLoader(state, action: PayloadAction<{ type: keyof BooksLoaders, value: boolean }>) {
            state.loaders[action.payload.type] = action.payload.value;
        },

        // ? Fetch Books Reducers
        getBooksSuccess(state, action: PayloadAction<Book[]>) {
            state.books = action.payload;
        },

        // ? Create Book Reducers
        createBookSuccess(state, action: PayloadAction<Book>) {
            state.books.push(action.payload);
        },

        updateBookAvailability(state, action: PayloadAction<{ bookId: string, availability: boolean }>) {
            const bookIndex = state.books.findIndex((book) => book.id === action.payload.bookId);

            if (bookIndex > -1) {
                state.books[bookIndex].availability = action.payload.availability;
            }
        },
    },
});

export const {
    setLoader,
    getBooksSuccess,
    createBookSuccess,
    updateBookAvailability,
} = booksSlice.actions;

export const fetchBooks = createAsyncThunk<void, GetBooksRequestParams, {}>(
    'books/fetchAll',
    async (params: GetBooksRequestParams, { dispatch }) => {
        try {
            dispatch(setLoader({ type: 'fetch', value: true }));
            const usecase: GetBooksUseCase = new GetBooksUseCase();
            const response = await usecase.execute(params);

            console.log('Fetch Books Response: ', response);

            if (response.status === 200 && response.data.status)
                dispatch(getBooksSuccess(response.data.data));
            else
                dispatch(showError({ message: response.data.message || 'Failed to fetch books!' }));
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

export default booksSlice.reducer;
