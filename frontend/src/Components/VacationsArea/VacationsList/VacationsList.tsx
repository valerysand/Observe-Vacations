import { Component } from "react";
import { Unsubscribe } from "redux";
import VacationModel from "../../../Models/VacationModel";
import vacationsStore, { authStore } from "../../../Redux/Store";
import authService from "../../../Services/AuthService";
import vacationsService from "../../../Services/VacationService";
import Loading from "../../SharedArea/Loading/Loading";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationsList.css";
import { Grid } from "@mui/material";
import notifyService from "../../../Services/NotifyService";
import UserModel from "../../../Models/UserModel";


interface VacationsListState {
    vacations: VacationModel[];   // vacations list
    followedVacations: VacationModel[]; // vacations that the user is following
    isAdmin: boolean; // is the user an admin
    userId: number; // the user id
}

class VacationsList extends Component<{}, VacationsListState> {

    private unsubscribeMeFollowedVacations: Unsubscribe;
    private unsubscribeMeVacations: Unsubscribe;

    public async componentDidMount() {
        try {
            const userId = authService.getUserId();
            const followedVacations = await vacationsService.getAllFollowedVacations(userId);
            this.setState({ followedVacations });

            this.unsubscribeMeFollowedVacations = vacationsStore.subscribe(async () => {
                const followedVacations = await vacationsService.getAllFollowedVacations(userId);
                this.setState({ followedVacations });
            });

            const vacations = await vacationsService.getAllVacations();
            this.setState({ vacations });

            this.unsubscribeMeVacations = vacationsStore.subscribe(async () => {
                const vacations = await vacationsService.getAllVacations();
                this.setState({ vacations });
            });


        }
        catch (err: any) {
            notifyService.error(err.message)

        }
    }

    public componentWillUnmount(): void {
        this.unsubscribeMeFollowedVacations();
        this.unsubscribeMeVacations();
    }

    public render(): JSX.Element {
        return (

            <div className="VacationsList">

                {this.state?.vacations === undefined && <Loading />}

                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {this.state?.followedVacations?.map(v =>
                        <Grid item xs={2} sm={4} md={3} key={v.vacationId}>
                            <VacationCard key={v.vacationName} vacation={v} />
                        </Grid>
                    )}
                    {this.state?.vacations?.map(v =>
                        <Grid item xs={2} sm={4} md={3} key={v.vacationId}>
                            <VacationCard key={v.vacationName} vacation={v} />
                        </Grid>
                    )}
                </Grid>
            </div>
        );
    }
}

export default VacationsList;
