import winston from "winston";
import * as path from "path";

let logger: winston.Logger;

if (!logger) {
    logger = winston.createLogger({
        transports: [
            new winston.transports.Console({ level: process.env.NODE_ENV === "production" ? "error" : "debug" }),
            new winston.transports.File({
                filename: path.join("log", "app.log"),
                level: "info"
            })
        ]
    });
}

export { logger };
