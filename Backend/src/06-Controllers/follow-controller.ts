import express, { Request, Response, NextFunction } from "express";
import jwt from "../01-Utils/jwt";
import verifyToken from "../02-Middleware/verify-token";
import FollowVacation from "../03-Models/followVacation-model";
import logic from "../05-BLL/follow-logics";



const router = express.Router();


// Follow vacation router
router.post("/add/:id", verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.id;
        const user = jwt.getUserFromToken(request);
        const follow = new FollowVacation(user.userId, vacationId);
        const followedVacation = await logic.addFollow(follow);
        response.status(201).json(followedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

// Delete follow from vacations
router.delete("/remove/:id",  verifyToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.id;
        const user = jwt.getUserFromToken(request);
        const follower = new FollowVacation(user.userId, vacationId);
        await logic.removeFollow(follower);
        response.sendStatus(204);

    }
    catch (err: any) {
        next(err);
    }
})


export default router;