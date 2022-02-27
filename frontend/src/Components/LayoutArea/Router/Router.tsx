import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { authStore } from "../../../Redux/Store";
import authService from "../../../Services/AuthService";
import SignIn from "../../AuthArea/LoginPage/LoginPage";
import Logout from "../../AuthArea/Logout/Logout";
import SignUp from "../../AuthArea/RegisterPage/RegisterPage";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import UpdateVacation from "../../VacationsArea/UpdateVacation/UpdateVacation";

import VacationsList from "../../VacationsArea/VacationsList/VacationsList";
import Page404 from "../Page404/Page404";

function Router(): JSX.Element {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isAdmin,setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        const unsubscribeMe = authStore.subscribe(() => {
            setIsLoggedIn(authService.isLoggedIn());
        });
        return () => unsubscribeMe();
    }, []);

    useEffect(() => {
        const isAdmin = authService.isAdmin();
        setIsAdmin(isAdmin); 
    },[]);


    return (
        <div className="Router">
            <Routes>
                {/* Route by default */}
                <Route path="/" element={<Navigate replace to="/home" />} />
                {/* Page not found route - must be last route: */}
                <Route path="*" element={<Page404 />} />

                {/* Auth Routes */}
                <Route path="/register" element={<SignUp />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/logout" element={<Logout />} />

                {/* Vacations Routes */}
                <Route path="/home" element={isLoggedIn ? <VacationsList /> : <Navigate to="/login" />} />

                <Route path="/vacations" element={<VacationsList />} />
                <Route path="/vacations/new" element={isAdmin ? <AddVacation /> : <Navigate to="*" /> }/>
                <Route path="/update-vacation/:id" element={isAdmin ? <UpdateVacation /> : <Navigate to="*" />} />
            </Routes>
        </div>
    );
}

export default Router;
