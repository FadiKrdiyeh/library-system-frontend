import { useRef, useState } from "react";
import { useSelector } from "react-redux";

import { Box, Container, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';

import { AppState, store } from "../../../store";
import { register } from "../authSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Register: React.FC = () => {
    const registerLoader = useSelector((state: AppState) => state.auth.loaders).register;

    const [nameInputErrorStatus, setNameInputErrorStatus] = useState<boolean>(false);
    const [usernameInputErrorStatus, setUsernameInputErrorStatus] = useState<boolean>(false);
    const [passwordInputErrorStatus, setPasswordInputErrorStatus] = useState<boolean>(false);
    const [confirmPasswordInputErrorStatus, setConfirmPasswordInputErrorStatus] = useState<boolean>(false);

    const nameInputRef = useRef<HTMLInputElement>(null);
    const usernameInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

    const [passwordVisiblity, setPasswordVisiblity] = useState<boolean>(false);
    const handleTogglePasswordVisibility = () => {
        setPasswordVisiblity((value) => !value);
    }

    const [confirmPasswordVisiblity, setConfirmPasswordVisiblity] = useState<boolean>(false);
    const handleToggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisiblity((value) => !value);
    }

    const handleSubmitRegister: any = async (event: Event) => {
        event.preventDefault();

        setNameInputErrorStatus(false);
        setUsernameInputErrorStatus(false);
        setPasswordInputErrorStatus(false);
        setConfirmPasswordInputErrorStatus(false);

        const trimmedName = nameInputRef.current?.value.trim();
        const trimmedUsername = usernameInputRef.current?.value.trim();
        const trimmedPassword = passwordInputRef.current?.value.trim();

        if (!trimmedName) {
            setNameInputErrorStatus(true);
            nameInputRef.current?.focus();
            return;
        }
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
        if (passwordInputRef.current?.value !== confirmPasswordInputRef.current?.value) {
            setConfirmPasswordInputErrorStatus(true);
            confirmPasswordInputRef.current?.focus();
            return;
        }

        console.log(event, trimmedName, trimmedUsername, trimmedPassword);
        await store.dispatch(register({ name: trimmedName, username: trimmedUsername, password: trimmedPassword }));
    }

    return <Box mt='50px'>
        <Container>
            <Grid container>
                <Grid item xs={10} md={6} lg={4} marginX='auto'>
                    <form onSubmit={handleSubmitRegister}>
                        <h1>Register</h1>
                        <Box display='flex' flexDirection='column'>
                            <TextField label='Name' sx={{ marginBottom: '20px' }} inputRef={nameInputRef} error={nameInputErrorStatus} helperText={nameInputErrorStatus && "This field is required!"} />
                            <TextField label='Username' sx={{ marginBottom: '20px' }} inputRef={usernameInputRef} error={usernameInputErrorStatus} helperText={usernameInputErrorStatus && "This field is required!"} />
                            <FormControl sx={{ marginBottom: '20px' }} variant="outlined" error={passwordInputErrorStatus}>
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
                                {passwordInputErrorStatus && <FormHelperText>
                                    This field is required!
                                </FormHelperText>}
                            </FormControl>

                            <FormControl sx={{ marginBottom: '20px' }} variant="outlined" error={confirmPasswordInputErrorStatus}>
                                <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-confirm-password"
                                    inputRef={confirmPasswordInputRef}
                                    error={confirmPasswordInputErrorStatus}
                                    type={confirmPasswordVisiblity ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle confirm password visibility"
                                                onClick={handleToggleConfirmPasswordVisibility}
                                                edge="end"
                                            >
                                                {confirmPasswordVisiblity ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Confirm Password"
                                />
                                {(confirmPasswordInputErrorStatus || passwordInputRef.current?.value !== confirmPasswordInputRef.current?.value) && <FormHelperText>
                                    {(passwordInputRef.current?.value !== confirmPasswordInputRef.current?.value) ? "Password and confirm password does not match!" : (confirmPasswordInputErrorStatus ? "This field is required!" : null)}
                                </FormHelperText>}
                            </FormControl>

                            <LoadingButton
                                type="submit"
                                loading={registerLoader}
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

export default Register;
