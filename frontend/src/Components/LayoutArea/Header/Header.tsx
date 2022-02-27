import { Container, Navbar } from "react-bootstrap";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import logoImage from "../../../Assets/logo.png";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <>
            <Navbar  variant="light">
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            alt=""
                            src={logoImage}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        Observe Vacations
                    </Navbar.Brand>
                    <AuthMenu />
                </Container>
            </Navbar>
        </>
    );
}

export default Header;