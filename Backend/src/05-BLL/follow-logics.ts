import { OkPacket } from "mysql";
import FollowModel from "../03-Models/followVacation-model";
import dal from "../04-DAL/dal";
import socketLogic from "./socket-logic";



// Add follow vacation
async function addFollow(vacationToFollow: FollowModel): Promise<FollowModel> {
    const sql = `INSERT INTO follows(userId, vacationId)
                VALUES(${vacationToFollow.userId}, ${vacationToFollow.vacationId})`;
    const result: OkPacket = await dal.execute(sql);

    // update +1 to followers in vacations table
    const sqlVacationsTable = `UPDATE Vacations 
                            SET followers = followers + 1 
                            WHERE vacationId = ${vacationToFollow.vacationId}`;
    const info: OkPacket = await dal.execute(sqlVacationsTable);
    socketLogic.emitAddFollow(vacationToFollow);
    return vacationToFollow;
}

// Remove follow 
async function removeFollow(follow: FollowModel): Promise<void> {
    // remove follower from followers table
    const sqlFollowerTable = `DELETE FROM follows 
      WHERE vacationId=${follow.vacationId} 
      AND userId=${follow.userId}`;
    const results: OkPacket = await dal.execute(sqlFollowerTable);
    // update -1 to followers in vacations table
    const sqlVacationsTable = `UPDATE Vacations 
                                SET followers = followers - 1 
                                WHERE vacationId = ${follow.vacationId}`;
    const info: OkPacket = await dal.execute(sqlVacationsTable);
    socketLogic.emitRemoveFollow(follow);
}

export default {
    addFollow,
    removeFollow,
}