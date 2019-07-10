import { Request, Response } from "express";
import { response, withRequestValidation } from "@blendsdk/express";
import { check } from "express-validator";

function pong(name: string): Promise<string> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`Pong ${name}`);
        }, 2000);
    });
}

async function handler(req: Request, res: Response) {
    const { name } = req.query || req.body;
    response(res).OK(await pong(name));
}

const pingController = [
    check("username").isString(),
    check("password").isString(),
    check("name", "name is required").isString(),
    withRequestValidation(handler)
];

export { pingController };
