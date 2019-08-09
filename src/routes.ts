import { Express } from "express";
import { pingController } from "./controllers/ping";
import { loginController } from "./controllers/auth";
import { accountCreateController } from "./controllers/account/create";

/**
 * Defines app the routes in this application
 *
 * @export
 * @param {Express} app
 */
export function defineRoutes(app: Express) {

    // authentication
    app.post("/api/login", ...loginController);

    // account
    app.post("/api/account/create", ...accountCreateController);

    // ping
    app.get("/api/v1/ping", ...pingController);
}