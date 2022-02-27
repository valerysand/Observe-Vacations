import axios from "axios";
import FollowModel from "../Models/FollowModel";
import config from "../Utils/Config";

class FollowService {

    // Follow vacation
    public async follow(follow: FollowModel): Promise<FollowModel> {
        const response = await axios.post<FollowModel>(config.urls.followVacation, follow);
        const followedVacation = response.data;
        return followedVacation;

    }

    public async unfollow(userId: number, vacationId: number): Promise<void> {
      await axios.delete<FollowModel>(config.urls.unfollowVacation + { userId, vacationId });
    }


}


const followService = new FollowService();

export default followService;
