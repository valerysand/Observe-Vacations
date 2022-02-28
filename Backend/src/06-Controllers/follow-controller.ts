import express, { Request, Response, NextFunction } from "express";
import FollowVacation from "../03-Models/followVacation-model";
import logic from "../05-BLL/follow-logics";



const router = express.Router();


// Follow vacation router
router.post("/add", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.id;
        request.body.id = vacationId;
        const follow = new FollowVacation(request.body);
        console.log(follow);
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
        const vacationId = +request.params.id;
        request.body.id = vacationId;
        const vacation = new FollowVacation(request.body);
        const removeFollow = await logic.removeFollow(vacation);
        response.status(201).json(removeFollow);

    }
    catch (err: any) {
        next(err);
    }
})


export default router;