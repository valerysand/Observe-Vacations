import { followStore } from './../Redux/Store';
import { addFollowAction, deleteFollowAction, FollowAction } from './../Redux/FollowState';
import { Socket, io } from "socket.io-client";
import VacationModel from "../Models/VacationModel";
import { vacationsStore } from "../Redux/Store";
import { addVacationAction, deleteVacationAction, updateVacationAction } from "../Redux/VacationsState";
import config from "../Utils/Config";
import authService from "./AuthService";
import FollowModel from '../Models/FollowModel';



class SocketIoServer {
    private socket: Socket;

    public connect(): void {

        // Connect to socket server:
        this.socket = io(config.urls.socketServer);

        if (authService.isAdmin()) return;
        

        // Listen to adding a vacation by admin:
        this.socket.on("admin-add-vacation", (vacation: VacationModel) => {
            vacationsStore.dispatch(addVacationAction(vacation));
        });

        // Listen to updating a vacation by admin:
        this.socket.on("admin-update-vacation", (vacation: VacationModel) => {
            vacationsStore.dispatch(updateVacationAction(vacation));
            console.log("admin-update-vacation");
            
        });

        // Listen to deleting a vacation by admin:
        this.socket.on("admin-delete-vacation", (id: number) => {
            vacationsStore.dispatch(deleteVacationAction(id));
        });

        // Listen to adding a vacation by user:
        this.socket.on("user-add-follow", (follow: FollowModel) => {
            followStore.dispatch(addFollowAction(follow));
            console.log("user-add-follow");
            
        });

        // Listen to removing a vacation by user:
        this.socket.on("user-remove-follow", (follow: FollowModel) => {
            followStore.dispatch(deleteFollowAction(follow));

        }
        );

        // Listen to followed vacations by user:
        this.socket.on("user-followed-vacations", (vacation: VacationModel) => {
            vacationsStore.dispatch(updateVacationAction(vacation));
            console.log("user-followed-vacations");
        });
        
    }
    // Listen to disconnection:
    public disconnect(): void {
        this.socket.disconnect();
    }
}

const socketIoService = new SocketIoServer();

export default socketIoService;