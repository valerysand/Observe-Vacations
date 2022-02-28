import { Container, Navbar } from "react-bootstrap";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import logoImage from "../../../Assets/logo.png";
import { useNavigate } from "react-router-dom";

function Header(): JSX.Element {

    const navigator = useNavigate();
    return (
        <>
            <Navbar  variant="light">
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
                    <AuthMenu />
                </Container>
            </Navbar>
        </>
    );
}

export default Header;