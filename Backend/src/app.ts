import dotenv from "dotenv";
dotenv.config();

import express, { NextFunction, Request, Response } from "express";
import expressFileUpload from "express-fileupload";
import cors from "cors";
import ClientError from "./03-Models/client-error";
import vacationsController from "./06-Controllers/vacations-controller";
import errorsHandler from "./02-Middleware/error-handler";
import authController from "./06-Controllers/auth-controller";
import followsController from "./06-Controllers/follow-controller";
import socketLogic from "./05-BLL/socket-logic";


// create the server:
const expressServer = express();
// enable CORS:
expressServer.use(cors());
// allow to use json on responses:
expressServer.use(expressFileUpload());
expressServer.use(express.json());

// use controllers:
expressServer.use("/api/auth", authController);
expressServer.use("/api/vacations", vacationsController);
expressServer.use("/api/vacations/follows", followsController);

expressServer.use("*", (request: Request, response: Response, next: NextFunction) => {
    const error = new ClientError(404, "Route not found");
    next(error);
})

expressServer.use(errorsHandler); // Register error handling middleware as the last one

const httpServer = expressServer.listen(3001, () => console.log("Listening..."));
socketLogic.initSocketIo(httpServer);