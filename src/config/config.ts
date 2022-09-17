import dotenv from "dotenv";
import { CorsOptions } from "cors";
// import { CookieSessionOptions } from "cookie-session";

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 1337;

const whitelist = [
  process.env.CLIENT_URL,
  "http://127.0.0.1:5500",
  "http://localhost:9090",
];

const CORS_OPTIONS: CorsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

const SESSION_OPTIONS = {
  name: "session",
  keys: ["server"],
  maxAge: 24 * 60 * 60 * 1000 * 30, // 30 days
};

export const config = {
  server: {
    port: SERVER_PORT,
    corsOptions: CORS_OPTIONS,
    sessionOptions: SESSION_OPTIONS,
  },
};
