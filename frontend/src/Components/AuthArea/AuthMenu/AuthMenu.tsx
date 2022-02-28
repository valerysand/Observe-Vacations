import { Button } from "@mui/material";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import { Unsubscribe } from "redux";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/Store";
import "./AuthMenu.css";

interface AuthMenuState {
    user: UserModel;
}

class AuthMenu extends Component<{}, AuthMenuState> {
    
    private unsubscribeMe: Unsubscribe;
    private navigator: Navigator;

    public componentDidMount() {

        this.setState({ user: authStore.getState().user });

        this.unsubscribeMe = authStore.subscribe(() => {
            const user = authStore.getState().user;
            this.setState({ user });
        });

    }

    public render(): JSX.Element {
        return (
            <div className="AuthMenu">

                {!this.state?.user &&
                    <>
                        <span>Hello Guest</span>
                        <span> | </span>
                        <Button variant="text" color="primary"><NavLink to="/login">Login</NavLink></Button>
                        <Button variant="text" color="error"><NavLink to="/register">Register</NavLink></Button>

                    </>
                }

                {this.state?.user &&
                    <>
                        <span>Hello {this.state.user.firstName + " " + this.state.user.lastName}</span>
                        <span> | </span>
                        <Button variant="text" color="error"><NavLink to="/logout">Logout</NavLink></Button>
                    </>
                }

            </div>
        );
    }

    public componentWillUnmount(): void {
        this.unsubscribeMe();
    }
}

export default AuthMenu;