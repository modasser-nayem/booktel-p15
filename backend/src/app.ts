import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "./app/utils/logger";
import routers from "./app/routes";
import { notfound } from "./app/middlewares/notFound";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import config from "./app/config";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.handleErrors();
  }

  private config() {
    this.app.use(
      cors({
        origin: config.FRONTEND_URL,
        credentials: true,
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
      })
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use((req, res, next) => {
      logger.info(`${req.method} ${req.url}`);
      next();
    });
  }

  private routes() {
    // home route
    this.app.get("/", (req, res) => {
      res
        .status(200)
        .send(
          '<div style="height:80vh; width:100vw; display:flex; justify-content:center;align-items:center;font-size:4rem;font-style: oblique;font-weight: bold;font-family:system-ui;color:purple;">Booktel Server is Running...</div>',
        );
    });

    this.app.get("/api/health", (req, res, next) => {
      res.status(200).json({
        message: "Server Health is Ok",
      });
    });

    this.app.use("/api/v1", routers);
  }

  private handleErrors() {
    this.app.use(notfound);
    this.app.use(globalErrorHandler);
  }
}

export default new App().app;
