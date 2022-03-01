import { Container, Nav, Navbar } from "react-bootstrap";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import logoImage from "../../../Assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import authService from "../../../Services/AuthService";
import { Unsubscribe } from "redux";
import { authStore } from "../../../Redux/Store";

function Header(): JSX.Element {

    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    const unsubscribeMe: Unsubscribe = authStore.subscribe(() => {
        const isAdmin = authService.isAdmin();
        setIsAdmin(isAdmin);
    })


    useEffect(() => {
        return () => {
            unsubscribeMe();
        };
    }, []);

    const navigator = useNavigate();
    return (
        <>
            <Navbar variant="dark" >
                <Container>
                    <Navbar.Brand onClick={() => navigator("/home")}>
                        <img
                            alt=""
                            src={logoImage}
                            width="40"
                            height="40"
                            className="d-inline-block align-center"
                        />{' '}
                        Observe Vacations
                    </Navbar.Brand>
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link onClick={() => navigator("/home")}>Home</Nav.Link>
                        {isAdmin && <Nav.Link onClick={() => navigator("/add-vacation")}>Add vacation</Nav.Link>}
                    </Nav>
                    <AuthMenu />
                </Container>
            </Navbar>
        </>
    );
}

export default Header;