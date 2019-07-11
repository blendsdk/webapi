import { Request, Response, NextFunction, RequestHandler } from "express";
import { isArray, wrapInArray } from "@blendsdk/stdlib";
import jwt from "jsonwebtoken";
import { response, authenticatedUser } from "@blendsdk/express";
import { logger } from "../logger";
import { ISysUser } from "../database/dbtypes";

/**
 * Interface for describing a minimal JWT
 *
 * @export
 * @interface JWTData
 */
export interface JWTData {
    maxAge?: number;
    [name: string]: any;
}

/**
 * Interface  for describing an authenticated user
 *
 * @export
 * @interface IAuthenticatedUser
 * @extends {ISysUser}
 */
export interface IAuthenticatedUser extends ISysUser {
    roles?: string[];
}

/**
 * Get the JWT_SECRET provided from the .env file.
 *
 * @returns {string}
 */
function getJWTSecret(): string {
    if (process.env.JWT_SECRET) {
        return process.env.JWT;
    } else {
        logger.warn("No JWT token was provided from .env!");
        return process.pid.toString();
    }
}

/**
 * Verify a JWT against a configures secret.
 *
 * @export
 * @param {string} token
 * @returns
 */
export function verifyJWTToken(token: string) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, getJWTSecret(), (err, decodedToken) => {
            if (err || !decodedToken) {
                return reject(err);
            }
            resolve(decodedToken);
        });
    });
}

/**
 * Create and encode data as JWT
 *
 * @export
 * @param {JWTData} details
 * @returns {string}
 */
export function createJWToken(details: JWTData): string {
    details = details || {};
    details.sessionData = details.sessionData || {};
    details.maxAge = parseInt((details.maxAge ||
        process.env.JWT_MAX_AGE ||
        3600) as any);
    delete details.password; // in case!
    return jwt.sign(
        {
            data: details.sessionData
        },
        getJWTSecret(),
        {
            expiresIn: details.maxAge,
            algorithm: "HS256"
        }
    );
}

/**
 * Check if the current request is from an authenticated user.
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function is_authenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    verifyJWTToken((req as any).token)
        .then((decodedToken: any) => {
            (req as any).user = decodedToken.data;
            next();
        })
        .catch(() => {
            res.status(400).json({ message: "Invalid auth token provided." });
        });
}

/**
 * Check if the authenticated user has a given role
 *
 * @export
 * @param {(string | string[])} role
 * @returns {RequestHandler}
 */
// export function has_role(role: string | string[]): RequestHandler {
//     const builder = (roles: string[]): RequestHandler => {
//         return (req: Request, res: Response, next: NextFunction) => {
//             const user: any = authenticatedUser(req);
//             if (user) {
//                 if (isArray(user.roles)) {
//                     let check = false;
//                     roles.forEach((r: string) => {
//                         user.roles.forEach((i: any) => {
//                             if (i.title === r || i.title === "ADMIN") {
//                                 check = true;
//                             }
//                         });
//                     });
//                     if (check) {
//                         next();
//                     } else {
//                         response(res).unAuthorized(
//                             `The user is not assigned to role${role.length > 1 ? "s" : ""}: ${roles.join(", ")}`
//                         );
//                     }
//                 } else {
//                     response(res).serverError("Invalid roles object!");
//                 }
//             } else {
//                 response(res).unAuthorized("The user is not authorized!");
//             }
//         };
//     };

//     return builder(wrapInArray(role));
// }
