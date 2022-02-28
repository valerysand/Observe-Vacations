import axios from "axios";
import FollowModel from "../Models/FollowModel";
import config from "../Utils/Config";

class FollowService {

    // Follow vacation
    public async addFollow(userId: number, vacationId: number): Promise<FollowModel> {
        const response = await axios.post<FollowModel>(config.urls.addFollow, {userId, vacationId});
        const followedVacation = response.data;
        return followedVacation;

    }

    // Unfollow vacation
    public async removeFollow(userId: number, vacationId: number): Promise<void> {
        const response = await axios.post(config.urls.removeFollow, {userId, vacationId});
        const removeFollow = response.data;
        return removeFollow;
    }
}


const followService = new FollowService();

export default followService;
