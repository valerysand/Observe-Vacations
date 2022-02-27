import { authStore } from './../Redux/Store';
import axios from "axios";
import UserModel from "../Models/UserModel";
import config from "../Utils/Config";
import { loginAction, logoutAction, registerAction } from '../Redux/AuthState';
import CredentialModel from '../Models/CredentialModel';
import Role from '../Models/Role';

class AuthService {

    public isAdmin(): boolean {
        return authStore.getState().user?.role === Role.Admin;
    }

    public isLoggedIn(): boolean {
        return authStore.getState().token !== null;
    }

    public async register(user: UserModel): Promise<void> {
        const response = await axios.post<string>(config.urls.register, user);
        const token = response.data;
        authStore.dispatch(registerAction(token));
    }

    public async login(credential: CredentialModel): Promise<void> {
        const response = await axios.post<string>(config.urls.login, credential);
        const token = response.data;
        authStore.dispatch(loginAction(token));
    }

    public logout(): void {
        authStore.dispatch(logoutAction());
    }
}

const authService = new AuthService();
export default authService;