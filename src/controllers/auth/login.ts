import { Request, Response } from "express";
import { response, withRequestValidation } from "@blendsdk/express";
import { check } from "express-validator";

async function handler(req: Request, res: Response) {
    const { name } = req.query || req.body
    response(res).OK({});
}

const loginController = [
    check("username").isString(),
    check("password").isString(),
    withRequestValidation(handler)
];

export { loginController }