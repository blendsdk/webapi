import express from "express";
import compression from "compression"; // compresses requests
import bodyParser from "body-parser";
import lusca from "lusca";
import dotenv from "dotenv";
import path from "path";
import bearerToken from "express-bearer-token";
import cors from "cors";
import { logger } from "./logger";
import { buildRoutes } from "@blendsdk/express";
import { routes } from "./routes";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env" });

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use(bearerToken());
app.use(cors({ origin: "*" }));
app.use(express.static(path.join(__dirname, "public"), { maxAge: 31557600000 }));
buildRoutes(app, routes);
logger.info(`Application initialized at ${new Date()}`);

export default app;
