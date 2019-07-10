import { Express } from "express";
import { pingController } from "./controllers/ping";
import { loginController } from "./controllers/auth";

/**
 * Defines app the routes in this application
 *
 * @export
 * @param {Express} app
 */
export function defineRoutes(app: Express) {

    // authentication
    app.post("/api/v1/login", ...loginController);

    // ping
    app.get("/api/v1/ping", ...pingController);
}