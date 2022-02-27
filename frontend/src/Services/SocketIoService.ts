import {Socket, io} from "socket.io-client";
import VacationModel from "../Models/VacationModel";
import vacationsStore from "../Redux/Store";
import { addVacationAction, deleteVacationAction, updateVacationAction } from "../Redux/VacationsState";
import config from "../Utils/Config";
import authService from "./AuthService";



class SocketIoServer {
    private socket: Socket;

    public connect(): void {

        // Connect to socket server:
        this.socket = io(config.urls.socketServer);

        if(authService.isAdmin()) return;

        // Listen to adding a vacation by admin:
        this.socket.on("admin-add-vacation", (vacation: VacationModel) => {
            vacationsStore.dispatch(addVacationAction(vacation));
        });

        // Listen to updating a vacation by admin:
        this.socket.on("admin-update-vacation", (vacation: VacationModel) => {
            vacationsStore.dispatch(updateVacationAction(vacation));
        });

        // Listen to deleting a vacation by admin:
        this.socket.on("admin-delete-vacation", (id: number) => {
            vacationsStore.dispatch(deleteVacationAction(id));
        });
    }

    public disconnect(): void {
        this.socket.disconnect();
    }
}

const socketIoService = new SocketIoServer();

export default socketIoService;