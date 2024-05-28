import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import {
    TextField,
    Box,
    Grid,
    Container,
} from '@mui/material';

import { AppState, store } from "../../../store";
import { fetchBorrowings } from "../borrowingsSlice";
import BorrowingCard from "../components/BorrowingCard";
import Loader from "../../../shared/components/Loader";

const ListBorrowings: React.FC = () => {
    const userId = useSelector((state: AppState) => state.auth.user)?.id
    const borrowings = useSelector((state: AppState) => state.borrowings.borrowings);
    const borrowingsLoaders = useSelector((state: AppState) => state.borrowings.loaders);

    const searchInputRef = useRef(null);

    const handleFetchBorrowings = useCallback(async () => {
        await store.dispatch(fetchBorrowings(userId || ''));
    }, [userId]);

    useEffect(() => {
        handleFetchBorrowings();
    }, [handleFetchBorrowings]);

    const [searchText, setSearchText] = useState<string>('');
    const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value)
    }

    const filteredBorrowings = borrowings.filter((borrowing) => borrowing.book.title.toLowerCase().includes(searchText.toLowerCase()) || borrowing.book.isbn.toLowerCase().includes(searchText.toLowerCase()) || borrowing.book.author.toLowerCase().includes(searchText.toLowerCase()));

    return <>
        <Container>
            <Box sx={{ mt: '20px' }}>
                <Grid container spacing={2} sx={{ flexDirection: 'row-reverse' }}>
                    <Grid xs={12} sm={12} md={12} lg={4} item>
                        <TextField id="outlined-basic" fullWidth label="Search" variant="outlined" size="small" placeholder="Title, author or ISBN..." ref={searchInputRef} onChange={handleSearchInput} />
                    </Grid>
                </Grid>
            </Box>
        </Container>

        {borrowingsLoaders.fetch && <Loader fixed overlay styles={{ text: { color: '#fff' } }} />}

        {borrowings.length > 0 && <Container sx={{ marginTop: '50px' }}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {filteredBorrowings.map((borrowing) => (
                        <Grid xs={12} sm={12} md={6} lg={3} item sx={{ padding: '15px !important' }} key={borrowing.id} position='relative'>
                            {/* {true && <Loader message='Please wait...' overlay styles={{ text: { color: '#111' } }} />} */}
                            <BorrowingCard borrowing={borrowing} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>}
        {borrowings.length === 0 && (!borrowingsLoaders.fetch ? <h3>No data found.</h3> : <h3>Please wait...</h3>)}
    </>;
}

export default ListBorrowings;