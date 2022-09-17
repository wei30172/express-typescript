import { NextFunction, Request, Response } from "express";
import { Logging } from "../middleware/Logger";

export const ErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new Error("Not found");

  Logging.error(error);

  res.status(404).json({
    message: error.message,
  });
};
