import express, { NextFunction, Request, Response } from "express";
import VacationModel from "../03-Models/vacation-model";
import logic from "../05-BLL/vacations-logic";
import path from "path";
import verifyToken from "../02-Middleware/verify-token";
import verifyAdmin from "../02-Middleware/verify-admin";
import jwt from "../01-Utils/jwt";


const router = express.Router();

// Get all vacations:
router.get("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacations = await logic.getAllVacations();
        response.json(vacations);

    }
    catch (err: any) {
        next(err);
    }
});
// Get all followed vacations:
router.get("/followed", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const user = jwt.getUserFromToken(request);
        const followedVacation = await logic.getAllFollowedVacations(user.userId);
        response.json(followedVacation);
    }
    catch (err: any) {
        next(err);
    }
})
// Get one vacation:
router.get("/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const vacation = await logic.getOneVacation(id);
        response.json(vacation);
    }
    catch (err: any) {
        next(err);
    }
});
// Add vacation to db:
router.post("/", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const addedVacation = await logic.addVacation(vacation);
        response.status(201).json(addedVacation);
    }
    catch (err: any) {
        next(err);
    }
});
// Update vacation
router.patch("/:id", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        request.body.vacationId = id;
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const updateVacation = await logic.updateFullVacation(vacation);
        response.json(updateVacation);
    }
    catch (err: any) {
        next(err);
    }
});

// Delete vacation from db
router.delete("/:id", verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await logic.deleteVacation(id);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});
// Get images 
router.get("/images/:imageName", (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = path.join(__dirname, "..", "Assets", "Images", "Vacations", imageName);
        response.sendFile(absolutePath);
    }
    catch (err: any) {
        next(err);
    }
});




export default router;