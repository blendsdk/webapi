import { IRoute, response } from "@blendsdk/express";
import { Request, Response } from "express";
import { loginController } from "./controllers/authentication/loginController";

const routes: IRoute[] = [
    {
        method: "post",
        endpoint: "/api/login",
        controller: loginController,
        secure: false,
        parameters: {
            username: { type: "string" },
            password: { type: "string" }
        }
    },
    {
        method: "post",
        endpoint: "/api/params",
        controller: async (req: Request, res: Response) => {
            return response(res).OK({ ...req.body, ...req.query });
        },
        secure: false,
        parameters: {
            q: { type: "number", optional: true },
            list: { type: "array", optional: true },
            flag: { type: "boolean", optional: true },
            amount: { type: "number", optional: true }
        }
    }
];

export { routes };
