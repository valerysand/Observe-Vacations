import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";

function Logout(): JSX.Element {

    const navigator = useNavigate();

    useEffect(() => {
        console.log("logout");
        
        authService.logout();
        alert("Logout success");
        navigator("/home");

    }, []);

    return null;
}

export default Logout;
