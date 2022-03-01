import axios from "axios";
import VacationModel from "../Models/VacationModel";
import vacationsStore from "../Redux/Store";
import { addVacationAction, deleteVacationAction, fetchFollowedVacationsAction, fetchVacationsAction } from "../Redux/VacationsState";
import config from "../Utils/Config";


class VacationService {
    // Get all vacations from API
    public async getAllVacations(): Promise<VacationModel[]> {
        if (vacationsStore.getState().vacations.length === 0) {
            const response = await axios.get<VacationModel[]>(config.urls.vacations);
            const vacations = response.data;
            vacationsStore.dispatch(fetchVacationsAction(vacations));
            return vacations;            
        }
        else {
            const vacations = vacationsStore.getState().vacations;
            return vacations;
        }
    }

    // Get all followed vacations:
    public async getAllFollowedVacations(userId: number): Promise<VacationModel[]> {
        if (vacationsStore.getState().followedVacations.length === 0) {
            const response = await axios.get<VacationModel[]>(config.urls.followedVacations + userId);
            const followedVacations = response.data;
            vacationsStore.dispatch(fetchFollowedVacationsAction(followedVacations));
            return followedVacations;            
        }
        else {
            const followedVacations = vacationsStore.getState().followedVacations;
            return followedVacations;
        }
    }

    // Get one vacation from API
    public async getOneVacation(id: number): Promise<VacationModel> {
        const vacations = vacationsStore.getState().vacations;
        const vacation = vacations.find(vacation => vacation.vacationId === id);
        if (vacation) {
            return vacation;
        }
        const response = await axios.get<VacationModel>(config.urls.vacations + id);
        return response.data;
    }

    // Add vacation to API
    public async addVacation(vacation: VacationModel): Promise<VacationModel> {
        const myFromData = new FormData();
        myFromData.append("vacationName", vacation.vacationName);
        myFromData.append("vacationDescription", vacation.vacationDescription);
        myFromData.append("vacationPrice", vacation.vacationPrice.toString());
        myFromData.append("fromDate", vacation.fromDate.toString());
        myFromData.append("toDate", vacation.toDate.toString());
        myFromData.append("image", vacation.image.item(0));
        const response = await axios.post<VacationModel>(config.urls.vacations, myFromData);
        const addedVacation = response.data;
        vacationsStore.dispatch(addVacationAction(addedVacation));
        return addedVacation;
    }

    // Update vacation in API
    public async updateVacation(vacation: VacationModel): Promise<VacationModel> {
        const myFromData = new FormData();
        myFromData.append("vacationName", vacation.vacationName);
        myFromData.append("vacationDescription", vacation.vacationDescription);
        myFromData.append("image", vacation.image.item(0));
        myFromData.append("vacationPrice", vacation.vacationPrice.toString());
        myFromData.append("fromDate", vacation.fromDate.toString());
        myFromData.append("toDate", vacation.toDate.toString());
        const response = await axios.put<VacationModel>(config.urls.vacations + vacation.vacationId, myFromData);
        const updatedVacation = response.data;
        vacationsStore.dispatch(addVacationAction(updatedVacation));
        return updatedVacation;
    }

    // Delete vacation from API
    public async deleteVacation(id: number): Promise<void> {
        await axios.delete(config.urls.vacations + id);
        vacationsStore.dispatch(deleteVacationAction(id));
    }
}

const vacationsService = new VacationService();

export default vacationsService;