import { useRef, useState } from "react";
import { useSelector } from "react-redux";

import { Box, Container, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';

import { AppState, store } from "../../../store";
import { login } from "../authSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login: React.FC = () => {
    const loginLoader = useSelector((state: AppState) => state.auth.loaders).login;

    const [usernameInputErrorStatus, setUsernameInputErrorStatus] = useState<boolean>(false);
    const [passwordInputErrorStatus, setPasswordInputErrorStatus] = useState<boolean>(false);

    const usernameInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const [passwordVisiblity, setPasswordVisiblity] = useState<boolean>(false);
    const handleTogglePasswordVisibility = () => {
        setPasswordVisiblity((value) => !value)
    }

    const handleSubmitLogin: any = async (event: Event) => {
        event.preventDefault();

        setUsernameInputErrorStatus(false);
        setPasswordInputErrorStatus(false);

        console.log(event, usernameInputRef.current?.value, passwordInputRef.current?.value);

        const trimmedUsername = usernameInputRef.current?.value.trim();
        const trimmedPassword = passwordInputRef.current?.value.trim();
        if (!trimmedUsername) {
            setUsernameInputErrorStatus(true);
            usernameInputRef.current?.focus();
            return;
        }
        if (!trimmedPassword) {
            setPasswordInputErrorStatus(true);
            passwordInputRef.current?.focus();
            return;
        }

        console.log(event, trimmedUsername, trimmedPassword);
        await store.dispatch(login({ username: trimmedUsername, password: trimmedPassword }));
    }

    return <Box mt='50px'>
        <Container>
            <Grid container>
                <Grid item xs={10} md={6} lg={4} marginX='auto'>
                    <form onSubmit={handleSubmitLogin}>
                        <h1>Login</h1>
                        <Box display='flex' flexDirection='column'>
                            <TextField label='Username' sx={{ marginBottom: '20px' }} inputRef={usernameInputRef} error={usernameInputErrorStatus} />
                            {/* <TextField label='Password' type={passwordVisiblity ? "text" : "password"} sx={{ marginBottom: '20px' }} inputRef={passwordInputRef} error={passwordInputErrorStatus} /> */}
                            <FormControl sx={{  marginBottom: '20px' }} variant="outlined" error={passwordInputErrorStatus}>
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    inputRef={passwordInputRef}
                                    error={passwordInputErrorStatus}
                                    type={passwordVisiblity ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleTogglePasswordVisibility}
                                                edge="end"
                                            >
                                                {passwordVisiblity ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>

                            <LoadingButton
                                type="submit"
                                loading={loginLoader}
                                loadingPosition="end"
                                endIcon={<SendIcon />}
                                variant="contained"
                                size="large"
                            >
                                Submit
                            </LoadingButton>
                        </Box>
                    </form>
                </Grid>
            </Grid>
        </Container>
    </Box>;
}

export default Login;
