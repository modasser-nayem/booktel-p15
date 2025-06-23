"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("./app/utils/logger"));
class AppServer {
    constructor() {
        this.port = process.env.PORT || 5000;
        this.server = (0, http_1.createServer)(app_1.default);
        this.startServer();
        this.handleProcessEvents();
    }
    startServer() {
        this.server = app_1.default.listen(this.port, () => {
            logger_1.default.info(`SERVER IS RUNNING ON PORT ${this.port}`);
        });
    }
    handleProcessEvents() {
        process.on("unhandledRejection", (err) => {
            console.error(`Unhandled Rejection detected. Shutting down server...`, err);
            this.shutdownServer();
        });
        process.on("uncaughtException", (err) => {
            console.error(`Uncaught Exception detected. Shutting down server...`, err);
            process.exit(1);
        });
    }
    shutdownServer() {
        if (this.server) {
            this.server.close(() => {
                process.exit(1);
            });
        }
        else {
            process.exit(1);
        }
    }
}
new AppServer();
