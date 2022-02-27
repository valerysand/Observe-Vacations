import { OkPacket } from "mysql";
import ClientError from "../03-Models/client-error";
import FollowVacation from "../03-Models/followVacation-model";
import UserModel from "../03-Models/user-model";
import VacationModel from "../03-Models/vacation-model";
import dal from "../04-DAL/dal";
import jwt from "../01-Utils/jwt";
import handleImages from "../01-Utils/handle-images";
import socketLogic from "./socket-logic";

// Get all vacations from database
async function getAllVacations(): Promise<VacationModel[]> {
    const sql = "SELECT * FROM vacations";
    const vacations = await dal.execute(sql);
    return vacations;
}
// Get one vacation from database
async function getOneVacation(id: number): Promise<VacationModel> {
    const sql = "SELECT VacationId AS id, vacationName AS name, vacationDescription AS description, vacationImage AS imageName, fromDate AS fromDate, toDate AS toDate, vacationPrice AS price FROM vacations WHERE vacationId = " + id;
    const vacations = await dal.execute(sql);
    const vacation = vacations[0];
    if (!vacation) {
        throw new ClientError(404, `id ${id} not found`);
    }
    return vacation;
}

// Add vacation to database
async function addVacation(vacation: VacationModel): Promise<VacationModel> {
    // Validate post 
    const errors = vacation.validatePost();
    if (errors) {
        throw new ClientError(400, errors);
    }

    handleImages.saveImageToDb(vacation);
    delete vacation.image;

    const sql = `INSERT INTO vacations(vacationName, vacationDescription, vacationImage, fromDate, toDate, vacationPrice)
    VALUES('${vacation.vacationName}', '${vacation.vacationDescription}', '${vacation.vacationImage}', '${vacation.fromDate}', '${vacation.toDate}', ${vacation.vacationPrice})`;
    const info: OkPacket = await dal.execute(sql);
    vacation.vacationId = info.insertId;
    socketLogic.emitAddVacation(vacation);
    return vacation;
}

// Update full vacation
async function updateFullVacation(vacation: VacationModel): Promise<VacationModel> {
    // Validate put
    const errors = vacation.validatePut();
    if (errors) {
        throw new ClientError(400, errors);
    }
    // const oldImage = await getOneVacation(vacation.id);
    // if (oldImage.imageName) {
    //     handleImages.deleteImageFromDb("./src/00-Images/" + oldImage.name + "/" + oldImage.imageName)
    // }
    handleImages.saveImageToDb(vacation);
    delete vacation.image;

    const sql = `UPDATE vacations SET
                vacationName = '${vacation.vacationName}',
                vacationDescription = '${vacation.vacationDescription}',
                vacationImage = '${vacation.vacationImage}',
                fromDate = '${vacation.fromDate}',
                toDate = '${vacation.toDate}',
                vacationPrice = ${vacation.vacationPrice}
                WHERE vacationId = ${vacation.vacationId}`;
    const info: OkPacket = await dal.execute(sql);
    socketLogic.emitUpdateVacation(vacation);
    return vacation;
}

// Update partial vacation
async function updatePartialVacation(vacation: VacationModel): Promise<VacationModel> {
    // Validate PATCH:
    const errors = vacation.validatePatch();
    if (errors) {
        throw new ClientError(400, errors);
    }
    const dbVacation = await getOneVacation(vacation.vacationId);
    // if(!dbVacation) {
    //     throw new ClientError(400, `id ${vacation.id} not found`);
    // }

    // Update it only with the given values from frontend:
    for (const prop in vacation) {
        if (vacation[prop] !== undefined) {
            dbVacation[prop] = vacation[prop];
        }
    }
    // Update to database:
    vacation = await updateFullVacation(dbVacation);
    socketLogic.emitUpdateVacation(vacation);
    return vacation;
}

// Delete vacation from database:
async function deleteVacation(id: number): Promise<void> {
    const dbVacations = getAllVacations();
    const index = (await dbVacations).findIndex(v => v.vacationId === id);
    if (index === -1) {
        throw new ClientError(404, `id ${id} not found`)
    }
    const sql = "DELETE FROM vacations WHERE vacationId = " + id;
    const info: OkPacket = await dal.execute(sql);
    socketLogic.emitDeleteVacation(id);
}

// Get all followed vacations:
async function getAllFollowedVacations(): Promise<VacationModel[]> {
    const sql = `(select *
        from vacations v
        join savedvacations s on v.vacationId = s.vacationId
        where userId = 2)
        union
        (select *
        from vacations v
        join savedvacations s on v.vacationId = s.vacationId
        where userId != 2);`;
    const allFollowedVacations = await dal.execute(sql);
    return allFollowedVacations;
}


export default {
    getAllVacations,
    getOneVacation,
    addVacation,
    updateFullVacation,
    updatePartialVacation,
    deleteVacation,
    getAllFollowedVacations
}