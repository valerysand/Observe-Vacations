import { OkPacket } from "mysql";
import ClientError from "../03-Models/client-error";
import FollowModel from "../03-Models/followVacation-model";
import dal from "../04-DAL/dal";



// Add follow vacation
async function addFollow(vacationToFollow: FollowModel): Promise<FollowModel> {
    const sql = `INSERT INTO savedVacations(userId, vacationId)
                VALUES(${vacationToFollow.userId}, ${vacationToFollow.vacationId})`;
    const result: OkPacket = await dal.execute(sql);

    // update +1 to followers in vacations table
    const sqlVacationsTable = `UPDATE Vacations 
                            SET followers = followers + 1 
                            WHERE vacationId = ${vacationToFollow.vacationId}`;
    const info: OkPacket = await dal.execute(sqlVacationsTable);
    return vacationToFollow;
}

// Remove follow 
async function removeFollow(follow: FollowModel): Promise<void> {
    // remove follower from followers table
    const sqlFollowerTable = `DELETE FROM savedVacations 
      WHERE vacationId=${follow.vacationId} 
      AND userId=${follow.userId}`;
    const results: OkPacket = await dal.execute(sqlFollowerTable);
    // update -1 to followers in vacations table
    const sqlVacationsTable = `UPDATE Vacations 
                                SET followers = followers - 1 
                                WHERE vacationId = ${follow.vacationId}`;
    const info: OkPacket = await dal.execute(sqlVacationsTable);
}

export default {
    addFollow,
    removeFollow,
}