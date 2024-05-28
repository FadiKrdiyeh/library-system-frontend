import { Book } from "../books/book.model";
import { User } from "../users/user.model";

export interface Borrowing {
    id: string;
    user: User;
    userId: string;
    book: Book;
    bookId: string;
    createdAt: string;
};
