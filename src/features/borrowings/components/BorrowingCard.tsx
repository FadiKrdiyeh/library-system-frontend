/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

import { Borrowing } from '../borrowing.model';
import { AppState, store } from '../../../store';
import { useSelector } from 'react-redux';
import { returnBook } from '../borrowingsSlice';
import { LoadingButton } from '@mui/lab';

interface BorrowingCardProps {
    borrowing: Borrowing,
}

const BorrowingCard: React.JSXElementConstructor<BorrowingCardProps> = ({ borrowing }) => {
    const borrowingsLoaders = useSelector((state: AppState) => state.borrowings.indexedLoaders);
    const handleReturnBook = async () => {
        await store.dispatch(returnBook(borrowing.id));
    }

    return <Card sx={{ minWidth: 275, textAlign: 'start' }} raised={true}>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {borrowing.book.isbn}
            </Typography>
            <Typography variant="h5" component="div">
                {borrowing.book.title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {borrowing.book.author}
            </Typography>
            <Typography variant="body2">
                {borrowing.book.description}
            </Typography>
            <hr />
            <Typography variant="caption">
                {borrowing.createdAt}
            </Typography>
        </CardContent>
        <CardActions>
            {/* {!borrowing.book.availability && <Button size="small" onClick={handleReturnBook}>Return</Button>} */}
            {!borrowing.book.availability && <LoadingButton
                loading={borrowingsLoaders.returnBook[borrowing.id]}
                variant="contained"
                size="small"
                onClick={handleReturnBook}
            >
                Return
            </LoadingButton>}
        </CardActions>
    </Card>
}

export default BorrowingCard;
