import { Request, Response } from "express";
import { check } from "express-validator";
import { is_authenticated, has_role } from "../../middleware/authentication";
import { response, withRequestValidation } from "@blendsdk/express";

async function handler(req: Request, res: Response) {
    return response(res).OK({
        password: "ass"
    });
}

const accountCreateController = [
    is_authenticated,
    has_role("ADMIN"),
    check("username").isString(),
    check("password").isString(),
    check("email").isString(),
    check("gender").isString(),
    check("first_name").isString(),
    check("last_name").isString(),
    check("roles").isArray(),
    withRequestValidation(handler)
];

export { accountCreateController };