import { configureStore } from "@reduxjs/toolkit";

import booksSlice from "../features/books/booksSlice";
import coreSlice from "../core/coreSlice";
import borrowingsSlice from "../features/borrowings/borrowingsSlice";
import authSlice from "../features/auth/authSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        books: booksSlice,
        borrowings: borrowingsSlice,
        core: coreSlice,
    }
});

export type AppState = ReturnType<typeof store.getState>
