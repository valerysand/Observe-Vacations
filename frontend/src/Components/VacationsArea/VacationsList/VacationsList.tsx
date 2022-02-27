import { Component } from "react";
import { Col, Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Unsubscribe } from "redux";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import vacationsStore, { authStore } from "../../../Redux/Store";
import authService from "../../../Services/AuthService";
import vacationsService from "../../../Services/VacationService";
import Loading from "../../SharedArea/Loading/Loading";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationsList.css";
import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

interface VacationsListState {
    vacations: VacationModel[];
    isAdmin: boolean;
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

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
                <Container fluid >
                    <Row >
                        {this.state?.vacations?.map(v =>
                            <VacationCard key={v.vacationName} vacation={v} />
                        )}
                    </Row>

                </Container>
            </div>
        );
    }
}

export default VacationsList;
