import express from "express";
import path from "path";
import { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import history from "connect-history-api-fallback";
import { config } from "./config/config";
import { Logging, Logger } from "./middleware/Logger";
import { ErrorHandler } from "./middleware/ErrorHandler";
import authRoutes from "./routes/user";
import rootRoutes from "./routes/root";

const app = express();

/** Custom middleware logger */
app.use(Logger);

/** Cross Origin Resource Sharing */
app.use(cors(config.server.corsOptions));

/** Built-in middleware to handle urlencoded data (form data) */
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: true }));

/** Built-in middleware for json */
app.use(express.json());

/** Set cookie-session */
app.use(cookieSession(config.server.sessionOptions));

/** Serve static files  */
if (process.env.NODE_ENV === "production") {
  app.use(history());
  app.use(express.static(path.join(__dirname, "/public")));
}
app.use("/api", express.static(path.join(__dirname, "/views")));

/** Route handlers*/
app.use("/api", rootRoutes);
app.use("/api/user", authRoutes);

app.get("/api/prevpage", (req: Request, res: Response, next: NextFunction) =>
  res.redirect(301, "/api")
);

const one = (req: Request, res: Response, next: NextFunction) => {
  console.log("1");
  next();
};

const two = (req: Request, res: Response, next: NextFunction) => {
  console.log("2");
  next();
};

const three = (req: Request, res: Response, next: NextFunction) => {
  console.log("3");
  res.send("Finished!");
};

app.get("/api/chain", [one, two, three]);

/** Health checking */
app.get("/ping", (req: Request, res: Response, next: NextFunction) =>
  res.status(200).json({ message: "pong" })
);

/** Error handling */
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.use(ErrorHandler);

/** Port  */
app.listen(config.server.port, () =>
  Logging.info(`Server is running on port ${config.server.port}`)
);
