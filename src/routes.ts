import { IRoute } from "@blendsdk/express";
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
    }
];

export { routes };
