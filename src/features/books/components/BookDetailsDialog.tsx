import React from "react";

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Typography } from "@mui/material"
import { TransitionProps } from "@mui/material/transitions";
import { Book } from "../book.model";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppState, store } from "../../../store";
import { borrowBook } from "../../borrowings/borrowingsSlice";
import { LoadingButton } from "@mui/lab";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface BookDetailsDialogProps {
    open: boolean;
    book: Book | null;
    onClose: () => void;
}

const BookDetailsDialog: React.JSXElementConstructor<BookDetailsDialogProps> = ({ open, book, onClose }) => {
    const isAuth = !!useSelector((state: AppState) => state.auth.token?.token)
    const navigate = useNavigate();

    const borrowingsLoaders = useSelector((state: AppState) => state.borrowings.indexedLoaders);
    const handleBorrowBook = async () => {
        if (isAuth) {
            if (!!book) {
                await store.dispatch(borrowBook(book.id));
                onClose();
            }
        } else {
            navigate('/auth/login')
        }
    }

    return <>
        {book && <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={onClose}
            aria-describedby="alert-dialog-slide-description"
            fullWidth
        >
            <DialogTitle>{book.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description" component='div'>
                    <div>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            ISBN: {book.isbn}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {book.author}
                        </Typography>
                        <Typography variant="body2">
                            {book.description}
                        </Typography>
                    </div>
                    <div>
                        <hr />
                        <Typography variant="caption">
                            {book.createdAt}
                        </Typography>
                    </div>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button size="small" onClick={onClose}>Close</Button>
                {!!book.availability && <LoadingButton
                    loading={borrowingsLoaders.borrowBook[book.id]}
                    variant="contained"
                    size="small"
                    onClick={handleBorrowBook}
                >
                    Borrow
                </LoadingButton>}
                {!book.availability && <Button size="small" disabled={true}>Borrowed</Button>}
                {/* <Button variant="contained" size="small" onClick={onClose}>Borrow</Button> */}
            </DialogActions>
        </Dialog >}
    </>
}

export default BookDetailsDialog;
