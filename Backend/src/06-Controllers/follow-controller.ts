import express, { Request, Response, NextFunction } from "express";
import FollowVacation from "../03-Models/followVacation-model";
import dal from "../04-DAL/dal";
import logic from "../05-BLL/follow-logics";



const router = express.Router();


// Follow vacation router
router.post("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacation = new FollowVacation(request.body);
        console.log(vacation);

        const followedVacation = await logic.addFollowVacation(vacation);
        response.status(201).json(followedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

// Delete follow from vacations
router.delete("/delete", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacation = new FollowVacation(request.body);
        await logic.unfollowVacation(vacation);
        response.status(201).json("Unfollow from vacation");

    }
    catch (err: any) {
        next(err);
    }
})


export default router;