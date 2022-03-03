
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import VacationModel from '../../../Models/VacationModel';
import config from '../../../Utils/Config';
import { useNavigate } from 'react-router-dom';
import {  vacationsStore } from '../../../Redux/Store';
import vacationsService from '../../../Services/VacationService';
import { deleteVacationAction } from '../../../Redux/VacationsState';
import UserModel from '../../../Models/UserModel';
import Role from '../../../Models/Role';
import Follow from '../../SharedArea/Follow/Follow';



interface VacationCardProps {
    vacation: VacationModel;
    user: UserModel;
}

// MUI Theme

 function VacationCard(props: VacationCardProps):JSX.Element {

    const navigator = useNavigate();

    async function handleDelete(vacationId: number) {
        try {
            // ask the user if he really wants to delete the vacation
            window.confirm('Are you sure you want to delete this vacation?');
            if(window.confirm('Are you sure you want to delete this vacation?')) {
            // delete vacation from the server
            await vacationsService.deleteVacation(vacationId);
            // delete vacation from redux
            vacationsStore.dispatch(deleteVacationAction(vacationId));
            alert("Vacation deleted");
            }
            else {
                alert("Vacation not deleted");
            }
        }
        catch (err: any) {
            alert(err.message);
        }
    }

    return (
        <Card sx={{
            maxWidth: 445,
            maxHeight: 420,
            height: 390,
            borderRadius: 3,
            background: "rgba(255, 255, 255, 0.8)",

        }} >
            {props.user?.role === Role.Admin &&
                <Typography variant="body1" color="dark">
                    Follows: {props.vacation?.followers}
                </Typography>}
            <CardMedia
                component="img"
                height="200"
                image={config.urls.vacationsImages + props.vacation.vacationImage}
                alt={props.vacation.vacationName}
            />
            <CardContent>
                <Typography variant="body1" color="dark">
                    {props.vacation.vacationName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Price: {props.vacation.vacationPrice}$
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    From: {props.vacation.fromDate}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    To: {props.vacation.toDate}
                </Typography>
            </CardContent>
            {props.user?.role === Role.Admin ?
                <CardActions disableSpacing>
                    <IconButton aria-label="edit" onClick={() => navigator("/update-vacation/" + props.vacation?.vacationId)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => { handleDelete(props.vacation?.vacationId) }}>
                        <ClearIcon />
                    </IconButton>
                </CardActions>
                :
                <Follow vacationId={props.vacation?.vacationId} />
            }
        </Card>
    );
}

export default VacationCard;