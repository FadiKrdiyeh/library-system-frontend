import { Button, Typography } from '@mui/material';
import ArrowRightRounded from '@mui/icons-material/ArrowRightRounded';

import classes from './NotFound.module.css';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (<div className={classes["page-not-found"]} id={classes["pageNotFound"]}>
        <div className={classes["not-found-container"]}>
            <h1 className={classes.error}>404</h1>
            <div className={classes.page}>Page not found.</div>
            <Button variant='contained'>
                <Typography color='white' sx={{ textDecoration: 'none' }} component={Link} to='/books'>
                    Back to books list
                </Typography>
                <ArrowRightRounded />
            </Button>
        </div >
    </div >
    )
}

export default NotFound;
