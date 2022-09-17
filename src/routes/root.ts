import express from "express";
import { NextFunction, Request, Response } from "express";
import path from "path";

const router = express.Router();

router.get(
  "/index(.html)?",
  (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.join(__dirname, "..", "views", "index.html"));
  }
);

export default router;
