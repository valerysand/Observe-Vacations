import dotenv from "dotenv";
dotenv.config();

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import config from "./01-Utils/config";
import expressFileUpload from "express-fileupload";
import ClientError from "./03-Models/client-error";
import vacationsController from "./06-Controllers/vacations-controller";
import errorsHandler from "./02-Middleware/error-handler";
import authController from "./06-Controllers/auth-controller";
import followsController from "./06-Controllers/follow-controller";
import socketLogic from "./05-BLL/socket-logic";
import path from "path";


// create the server:
const expressServer = express();
// enable CORS:
expressServer.use(cors());
// allow to use json on responses:
expressServer.use(expressFileUpload());
expressServer.use(express.json());

// Set the folder of index.html:
expressServer.use(express.static(path.join(__dirname, "./07-Frontend")));

// use controllers:
expressServer.use("/api/auth", authController);
expressServer.use("/api/vacations", vacationsController);
expressServer.use("/api/follows", followsController);

expressServer.use("*", (request: Request, response: Response, next: NextFunction) => {
    const error = new ClientError(404, "Route not found");
    next(error);
    
    // Send back index.html on any route-not-found:
    // response.sendFile(path.join(__dirname, "./07-Frontend/index.html"));
})

expressServer.use(errorsHandler); // Register error handling middleware as the last one
// start the server:
const httpServer = expressServer.listen(config.port, () => console.log("Server is running on port " + config.port));
// Start the socket logic:
socketLogic.initSocketIo(httpServer);