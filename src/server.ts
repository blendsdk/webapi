import errorHandler from "errorhandler";
import { logger } from "./logger";
import { logger as globalLogger } from "@blendsdk/express";

/**
 * Make sure the HTTP response stack has a logger
 */
globalLogger.registerLogger(logger);

import app from "./app";

/**
 * Error Handler. Provides full stack - remove for production
 */
if (process.env.NODE_ENV === "development") {
    app.use(errorHandler());
}

/**
 * Start Express server.
 */
const server = app.listen(app.get("port"), () => {
    logger.info("App is running at http://localhost:%d in %s mode", app.get("port"), app.get("env"));
    logger.info("Press CTRL-C to stop\n");
});

export { server, app };
