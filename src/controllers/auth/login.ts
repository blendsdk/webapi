import { Request, Response } from "express";
import { createJWToken } from "../../middleware/authentication";
import { response, withRequestValidation } from "@blendsdk/express";
import { check } from "express-validator";

/**
 * Interface for returning the token to the requester
 *
 * @export
 * @interface IJwtTokenResult
 */
export interface IJwtTokenResult {
    success: true;
    token: string;
}

async function handler(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
        return response(res).OK<IJwtTokenResult>({
            success: true,
            token: createJWToken({
                sessionData: {
                    username,
                    password
                },
                maxAge: (process.env.JWT_MAX_AGE as any) || 2592000
            })
        });
    } catch (err) {
        return response(res).unAuthorized(err);
    }
}

const loginController = [
    check("username").isString(),
    check("password").isString(),
    withRequestValidation(handler)
];

export { loginController };
