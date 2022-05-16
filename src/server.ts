import "./bootstrap";
import GracefulShutdown from "http-graceful-shutdown";
import https, { Server } from "https";
import http from "http";
import { app } from "./app";
import { logger } from "./utils/logger";


let server = process.env.PRODUCTION !== "test" ? https.createServer(app) : http.createServer(app);


const activeServer = server.listen(process.env.PORT, async () => {

    logger.info(`[server]: Server listening on port ${process.env.PORT}`);
});


GracefulShutdown(activeServer);
