import { Component } from "react";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Unsubscribe } from "redux";
import VacationModel from "../../../Models/VacationModel";
import vacationsStore, { authStore } from "../../../Redux/Store";
import authService from "../../../Services/AuthService";
import vacationsService from "../../../Services/VacationService";
import Loading from "../../SharedArea/Loading/Loading";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationsList.css";
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Grid } from "@mui/material";

interface VacationsListState {
    vacations: VacationModel[];
    isAdmin: boolean;
}

class VacationsList extends Component<{}, VacationsListState> {

    private unsubscribeMe: Unsubscribe;


    public async componentDidMount() {
        try {
            const vacations = await vacationsService.getAllVacations();
            this.setState({ vacations });
            this.unsubscribeMe = vacationsStore.subscribe(async () => {
                const vacations = await vacationsService.getAllVacations();
                this.setState({ vacations });
            });

            this.setState({ isAdmin: authService.isAdmin() });
            this.unsubscribeMe = authStore.subscribe(() => {
                this.setState({ isAdmin: authService.isAdmin() });
            })

        }
        catch (err: any) {
            alert(err.message)

        }
    }

    public componentWillUnmount(): void {
        this.unsubscribeMe();
    }

    public render(): JSX.Element {
        return (

            <div className="VacationsList">

                {this.state?.vacations === undefined && <Loading />}

                {this.state?.isAdmin ? <NavLink to="/vacations/new">New Vacation</NavLink> : null}
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
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
