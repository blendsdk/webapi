import { Request, Response } from "express";
import { createJWToken } from "../../middleware/authentication";
import { response, withRequestValidation } from "@blendsdk/express";
import { check } from "express-validator";
import { validateUser } from "../../services/accounts";
import { t } from "../../i18n";
import { isInstanceOf } from "@blendsdk/stdlib";

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

/**
 * Validates the user and provides a JWT authentication token.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
async function handler(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
        const user = await validateUser(username, password);
        if (!isInstanceOf(user, Error)) {
            return response(res).OK<IJwtTokenResult>({
                success: true,
                token: createJWToken({
                    sessionData: user,
                    maxAge: (process.env.JWT_MAX_AGE as any) || 2592000
                })
            });
        } else {
            return response(res).unAuthorized(t((user as Error).message));
        }
    } catch (err) {
        return response(res).serverError(err);
    }
}

const loginController = [
    check("username").isString(),
    check("password").isString(),
    withRequestValidation(handler)
];

export { loginController };
