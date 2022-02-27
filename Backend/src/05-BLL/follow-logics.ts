import FollowVacation from "../03-Models/followVacation-model";
import dal from "../04-DAL/dal";



// New follow vacation
async function addFollowVacation(vacationToFollow: FollowVacation): Promise<FollowVacation> {
    const sql = `INSERT INTO savedvacations(userId, vacationId)
                VALUES(${vacationToFollow.userId}, ${vacationToFollow.vacationId})`;
    const followedVacation = await dal.execute(sql);
    return followedVacation;
}

// Unfollow vacation
async function unfollowVacation(vacationToDelete: FollowVacation): Promise<void> {
    console.log(vacationToDelete);
    const sql = `DELETE FROM savedvacations WHERE userId = ${vacationToDelete.userId} AND vacationId = ${vacationToDelete.vacationId}`;

    await dal.execute(sql);
}

export default {
    addFollowVacation,
    unfollowVacation,
}