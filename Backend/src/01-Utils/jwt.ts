import { Request } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import UserModel from "../03-Models/user-model";
import config from "./config";

const secretKey = "Secret-Key";

function getNewToken(user: UserModel): string {
    const payload = { user };
    const token = jwt.sign(payload, secretKey, { expiresIn: config.loginExpiresIn });
    return token;
}

function verifyToken(request: Request): Promise<boolean> {
    return new Promise((resolve, reject) => {
        try {
            // If missing authirization header:
            if (!request.headers.authorization) {
                resolve(false);
                return;
            }

            const token = request.headers.authorization.substring(7);

            if (!token) {
                resolve(false);
                return;
            }

            jwt.verify(token, secretKey, (err: VerifyErrors, payload: JwtPayload) => {

                if (err) {
                    resolve(false);
                    return;
                }
                resolve(true);
            });
        }
        catch (err: any) {
            reject(err);
        }
    })
}

function getUserFromToken(request: Request): UserModel {
    // Get the token from the request:
    const token = request.headers.authorization.substring(7);
    // Extract the pauload:
    const payload = jwt.decode(token);
    // Extract the user from the payload:
    const user = (payload as any).user;

    return user;
}

export default {
    getNewToken,
    verifyToken,
    getUserFromToken
};