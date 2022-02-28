import FollowModel from "../03-Models/followVacation-model";
import dal from "../04-DAL/dal";



// Add follow vacation
async function addFollow(vacationToFollow: FollowModel): Promise<FollowModel> {
    const sql = `INSERT INTO savedvacations(userId, vacationId)
                VALUES(${vacationToFollow.userId}, ${vacationToFollow.vacationId})`;
    const followedVacation = await dal.execute(sql);
    return followedVacation;
}

// Remove follow 
async function removeFollow(vacationToDelete: FollowModel): Promise<FollowModel> {
    const sql = `DELETE FROM savedvacations WHERE userId = ${vacationToDelete.userId} AND vacationId = ${vacationToDelete.vacationId}`;

    const removeFollow = await dal.execute(sql);
    return removeFollow;
}

export default {
    addFollow,
    removeFollow,
}