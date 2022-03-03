import "./LoginPage.css";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink, useNavigate } from "react-router-dom";
import CredentialModel from "../../../Models/CredentialModel";
import authService from "../../../Services/AuthService";
import { useForm } from "react-hook-form";
import notifyService from "../../../Services/NotifyService";


const theme = createTheme();

export default function SignIn() {

    const navigator = useNavigate();
    const { register, handleSubmit } = useForm<CredentialModel>();



    async function submit(credentials: CredentialModel) {
        try {
            await authService.login(credentials);
            notifyService.success("You are logged in");
            navigator("/home");

        }
        catch (err: any) {
            notifyService.error(err.message);
        }

    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        background: 'rgba(255,255,255, 0.7);',
                        padding: 2,
                        borderRadius: 3
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(submit)} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Login"
                            name="login"
                            autoComplete="login"
                            autoFocus
                            {...register("username")}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            {...register("password")}
                        />
                        <Button
                            onClick={handleSubmit(submit)}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <NavLink to="/register">{"Don't have an account? Sign Up"}</NavLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
            
        </ThemeProvider>
    );
}