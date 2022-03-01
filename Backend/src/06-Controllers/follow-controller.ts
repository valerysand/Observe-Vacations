import express, { Request, Response, NextFunction } from "express";
import FollowVacation from "../03-Models/followVacation-model";
import logic from "../05-BLL/follow-logics";



const router = express.Router();


// Follow vacation router
router.post("/add", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const follow = new FollowVacation(request.body);
        const followedVacation = await logic.addFollow(follow);
        response.status(201).json(followedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

// Delete follow from vacations
router.post("/remove", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const follower = new FollowVacation(request.body);
        await logic.removeFollow(follower);
        response.sendStatus(204);

    }
    catch (err: any) {
        next(err);
    }
})


export default router;