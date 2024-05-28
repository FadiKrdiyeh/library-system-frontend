/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import { Card, CardContent, Typography, CardActions, Button, Tooltip } from '@mui/material';

import { Book } from '../book.model';
import { AppState, store } from '../../../store';
import { borrowBook } from '../../borrowings/borrowingsSlice';
import { LoadingButton } from '@mui/lab';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { truncateText } from '../../../core/helpers/string.helper';

interface BookCardProps {
    book: Book;
    onShowDetails: (book: Book) => void;
}

const BookCard: React.JSXElementConstructor<BookCardProps> = ({ book, onShowDetails }) => {
    const isAuth = !!useSelector((state: AppState) => state.auth.token?.token)
    const navigate = useNavigate();

    const borrowingsLoaders = useSelector((state: AppState) => state.borrowings.indexedLoaders);
    const handleBorrowBook = async () => {
        if (isAuth)
            await store.dispatch(borrowBook(book.id));
        else
            navigate('/auth/login')
    }

    const handleDetailsClick = () => {
        onShowDetails(book);
    }

    return <Card sx={{ minWidth: 275, textAlign: 'start', height: 300 }} raised={true}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '74%' }}>
            <div>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {book.isbn}
                </Typography>

                <Typography variant="h5" component="div">
                    {book.title}
                </Typography>

                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {book.author}
                </Typography>

                <Typography variant="body2">
                    {truncateText(book.description, 150)}
                    {book.description.length > 150 && <Tooltip title={book.description} placement='top'>
                        <Typography variant="body2" component='span' color='var(--main-color)'> [Read More]</Typography>
                    </Tooltip>}
                </Typography>
            </div>
            <div>
                <hr />
                <Typography variant="caption">
                    {book.createdAt}
                </Typography>
            </div>
        </CardContent>
        <CardActions>
            <Button size="small" onClick={handleDetailsClick}>Details</Button>

            {!!book.availability && <LoadingButton
                loading={borrowingsLoaders.borrowBook[book.id]}
                variant="contained"
                size="small"
                onClick={handleBorrowBook}
            >
                Borrow
            </LoadingButton>}
            {!book.availability && <Button size="small" disabled={true}>Borrowed</Button>}
        </CardActions>
    </Card>
}

export default BookCard;
