import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
    TextField,
    Box,
    Grid,
    Container,
} from '@mui/material';

import { AppState, store } from "../../../store";
import { fetchBooks } from "../booksSlice";
import { GetBooksRequestParams } from "../models/get-books-request-params.model";
import BookCard from "../components/BookCard";
import Loader from "../../../shared/components/Loader";
import BookDetailsDialog from "../components/BookDetailsDialog";
import { Book } from "../book.model";

const ListBooks: React.FC = () => {
    const books = useSelector((state: AppState) => state.books.books);
    const booksLoaders = useSelector((state: AppState) => state.books.loaders);

    const handleFetchBooks = useCallback(async (params: GetBooksRequestParams) => {
        await store.dispatch(fetchBooks(params));
    }, []);

    useEffect(() => {
        handleFetchBooks({ search: undefined });
    }, [handleFetchBooks]);

    const [searchTimer, setSearchTimer] = useState<any>(null);
    const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (searchTimer) {
            clearTimeout(searchTimer);
            setSearchTimer(null);
        }

        const newSearchTimer = setTimeout(() => {
            handleFetchBooks({ search: event.target.value });
        }, 1000);

        setSearchTimer(newSearchTimer);
    }

    const [bookDetailsDialogVisibility, setBookDetailsDialogVisibility] = useState<boolean>(false);
    const [selecteBook, setSelectedBook] = useState<Book | null>(null);

    const handleCloseBookDetaildDialog = () => {
        setBookDetailsDialogVisibility(false);
        setSelectedBook(null);
    }

    const handleShowBookDetailsDialog = (book: Book) => {
        console.log('test')
        setSelectedBook(book);
        setBookDetailsDialogVisibility(true);
    }

    return <>
        <Container>
            <Box sx={{ mt: '20px' }}>
                <Grid container spacing={2} sx={{ flexDirection: 'row-reverse' }}>
                    <Grid xs={12} sm={12} md={12} lg={4} item>
                        <TextField id="outlined-basic" fullWidth label="Search" variant="outlined" size="small" placeholder="Title, author or ISBN..." onChange={handleSearchInput} />
                    </Grid>
                </Grid>
            </Box>
        </Container>

        {booksLoaders.fetch && <Loader fixed overlay styles={{ text: { color: '#fff' } }} />}

        {books.length > 0 && <Container sx={{ marginTop: '50px' }}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {books.map((book) => (
                        <Grid xs={12} sm={12} md={6} lg={3} item sx={{ padding: '15px !important' }} key={book.id} position='relative'>
                            {/* {true && <Loader message='Please wait...' overlay styles={{ text: { color: '#111' } }} />} */}
                            <BookCard book={book} onShowDetails={handleShowBookDetailsDialog} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
            {/* {createPortal(<BookDetailsDialog open={true} book={book} onClose={() => {}} />, )} */}
            <BookDetailsDialog open={bookDetailsDialogVisibility} book={selecteBook} onClose={handleCloseBookDetaildDialog} />
        </Container>}
        {books.length === 0 && (!booksLoaders.fetch ? <h3>No data found.</h3> : <h3>Please wait...</h3>)}
    </>;
}

export default ListBooks;