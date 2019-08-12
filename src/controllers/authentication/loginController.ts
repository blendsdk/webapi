import { Request, Response } from "express";
import { response, createJWToken, IJwtTokenResult } from "@blendsdk/express";
import { t } from "../../i18n";
import { validateUser } from "../../services/authentication";

/**
 * Validates the user and provides a JWT authentication token.
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
export async function loginController(req: Request, res: Response) {
    const { username, password } = req.body;
    try {
        const vUser = await validateUser(username, password);
        if (!vUser.error) {
            return response(res).OK<IJwtTokenResult>({
                success: true,
                token: createJWToken({
                    sessionData: vUser.user,
                    maxAge: (process.env.JWT_MAX_AGE as any) || 2592000
                })
            });
        } else {
            return response(res).unAuthorized(t(vUser.error.message));
        }
    } catch (err) {
        return response(res).serverError(err);
    }
}
