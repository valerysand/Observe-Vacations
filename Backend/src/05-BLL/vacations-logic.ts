import { OkPacket } from "mysql";
import { v4 as uuid } from "uuid";
import ClientError from "../03-Models/client-error";
import VacationModel from "../03-Models/vacation-model";
import dal from "../04-DAL/dal";
import socketLogic from "./socket-logic";
import safeDelete from "../01-Utils/safe-delete";

// Get all vacations from database
async function getAllVacations(): Promise<VacationModel[]> {
    const sql = `SELECT vacationId, vacationDestination, 
                DATE_FORMAT(fromDate, "%d-%m-%Y") AS fromDate, 
                DATE_FORMAT(toDate, "%d-%m-%Y") AS toDate, vacationDescription, vacationImage, followers, vacationPrice from Vacations`;
    const vacations = await dal.execute(sql);
    return vacations;
}
// Get one vacation from database
async function getOneVacation(id: number): Promise<VacationModel> {
    const sql = `SELECT vacationId, vacationDestination, 
    DATE_FORMAT(fromDate, "%d-%m-%Y") AS fromDate, 
    DATE_FORMAT(toDate, "%d-%m-%Y") AS toDate, vacationDescription, vacationImage, followers, vacationPrice from Vacations WHERE vacationId = ` + id;
    const vacations = await dal.execute(sql);
    const vacation = vacations[0];
    socketLogic.emitAddVacation(vacation);
    console.log("user liked vacation: " + vacation.vacationDestination);
    
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

    // 1. Take the original extension (tiff, jpg, jpeg, gif, png, bmp, ....... ): 
    const extension = vacation.image.name.substr(vacation.image.name.lastIndexOf(".")); // ".jpg" / ".png" / ".gif"

    // 2. Create uuid file name including the original extension: 
    vacation.vacationImage = uuid() + extension;

    const sql = `INSERT INTO vacations(vacationDestination, vacationDescription, vacationImage, fromDate, toDate, vacationPrice)
    VALUES('${vacation.vacationDestination}', '${vacation.vacationDescription}', '${vacation.vacationImage}', '${vacation.fromDate}', '${vacation.toDate}', ${vacation.vacationPrice})`;
    const info: OkPacket = await dal.execute(sql);
    vacation.vacationId = info.insertId;
    // 3. Save the image to the disk:
    await vacation.image.mv("./src/Assets/Images/Vacations/" + vacation.vacationImage);

    // 4. Delete the image from the model so it won't get back to user:
    delete vacation.image;

    socketLogic.emitAddVacation(vacation);
    return vacation;
}

// Update full vacation
async function updateFullVacation(vacation: VacationModel): Promise<VacationModel> {
    // Validate put
    const errors = vacation.validatePatch();
    if (errors) {
        throw new ClientError(400, errors);
    }

    const dbVacation = await getOneVacation(vacation.vacationId);
    for (const prop in vacation) {
        if (vacation[prop] === undefined) {
            vacation[prop] = dbVacation[prop]
        }
    }
    // if user sent an image
    if (vacation.image !== undefined) {
        // take the original extension (tiff, jpg.jpeg, gif, png, bmp...):
        const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf(".")); //".jpg" etc.
        // create uuid file name
        vacation.vacationImage = uuid() + extension;

        await vacation.image.mv("./src/Assets/Images/Vacations/" + vacation.vacationImage);
        safeDelete("./src/Assets/Images/Vacations/" + dbVacation.vacationDestination); // delete the old image from disk

        delete vacation.image;
    }

    const sql = `UPDATE vacations SET
                vacationDestination = '${vacation.vacationDestination}',
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


// Delete vacation from database:
async function deleteVacation(id: number): Promise<void> {
    const vacation = await getOneVacation(id);
    if (!vacation) {
        throw new ClientError(404, `id ${id} not found`);
    }
    const sql = "DELETE FROM vacations WHERE vacationId = " + id;
    const info: OkPacket = await dal.execute(sql);
    // delete the image from disk:
    safeDelete("./src/Assets/Images/Vacations/" + vacation.vacationImage);
    socketLogic.emitDeleteVacation(id);
}

// Get all followed vacations:
async function getAllFollowedVacations(userId: number): Promise<VacationModel[]> {
    const sql = `SELECT Vacations.vacationId, vacationDestination,
                    DATE_FORMAT(fromDate, "%Y-%m-%d") AS fromDate, 
                    DATE_FORMAT(toDate, "%Y-%m-%d") AS toDate, vacationDescription, vacationImage, vacationDestination, followers, vacationPrice 
                    FROM Vacations 
                    JOIN follows on Vacations.vacationId = follows.vacationId 
                    WHERE userId = ${userId}`;
    const allFollowedVacations = await dal.execute(sql);
    return allFollowedVacations;
}


export default {
    getAllVacations,
    getOneVacation,
    addVacation,
    updateFullVacation,
    deleteVacation,
    getAllFollowedVacations
}