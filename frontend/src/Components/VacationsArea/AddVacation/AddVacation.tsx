import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink, useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationService";
import "./AddVacation.css";

// MUI theme
const theme = createTheme();

function AddVacation(): JSX.Element {
    const navigate = useNavigate();

    const { register, handleSubmit, formState } = useForm<VacationModel>();

    async function submit(vacation: VacationModel) {
        try {
            const addedVacation = await vacationsService.addVacation(vacation);
            notifyService.success(`Vacation ${addedVacation.vacationName} was added`);
            navigate("/home");
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
                        Add Vacation
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit(submit)} noValidate sx={{ mt: 1 }}>
                        <TextField
                            variant="standard"
                            fullWidth
                            helperText="Vacation Name"
                            margin="normal"
                            type="text"
                            {...register("vacationName", {
                                required: "Name is required",
                                minLength: { value: 3, message: "Name must be minimum 3 chars" },
                                maxLength: { value: 100, message: "Name can't exceed 100 chars" }
                            })}
                            {...formState.errors.vacationName && {
                                helperText: formState.errors.vacationName.message,
                                error: true
                            }}
                        />
                        <TextField
                            fullWidth
                            variant="standard"
                            margin='normal'
                            type="text"
                            helperText="Vacation Description"
                            {...register("vacationDescription", {
                                required: { value: true, message: "Description is required" },
                                minLength: { value: 3, message: "Name must be minimum 3 chars" },
                                maxLength: { value: 100, message: "Name can't exceed 100 chars" }
                            })}
                            {...formState.errors.vacationDescription && {
                                helperText: formState.errors.vacationDescription.message,
                                error: true
                            }}
                        />

                        <TextField
                            fullWidth
                            margin='normal'
                            type="number"
                            helperText="Vacation Price"
                            variant='standard'
                            {...register("vacationPrice", {
                                required: { value: true, message: "Price is required" },
                                min: { value: 0, message: "Price can't be negative" },
                                max: { value: 1000, message: "Price can't exceed $1000" }
                            })}
                            {...formState.errors.vacationPrice && {
                                helperText: formState.errors.vacationPrice.message,
                                error: true
                            }}
                        />

                        <TextField
                            margin='normal'
                            variant='standard'
                            fullWidth
                            type="date"
                            helperText="From Date"
                            {...register("fromDate", {
                                required: { value: true, message: "From date is required" },

                            })}
                            {...formState.errors.fromDate && {
                                helperText: formState.errors.fromDate.message,
                                error: true
                            }}
                        />

                        <TextField
                            fullWidth
                            margin='normal'
                            variant='standard'
                            helperText="To Date"
                            type="date"
                            {...register("toDate", {
                                required: { value: true, message: "Missing date" },

                            })}
                            {...formState.errors.toDate && {
                                helperText: formState.errors.toDate.message,
                                error: true
                            }}
                        />

                        <TextField
                            fullWidth
                            margin='normal'
                            variant='standard'
                            helperText="Image"
                            type="file"
                            inputProps={{ accept: "image/*" }}
                            {...register("image", {
                                required: { value: true, message: "Missing image" }
                            })}
                            {...formState.errors.image && {
                                helperText: formState.errors.image.message,
                                error: true
                            }}

                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained">Add</Button>
                        <Button><NavLink to="/home">Back</NavLink></Button>

                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default AddVacation;
