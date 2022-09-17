import { NextFunction, Request, Response } from "express";
import { IUser } from "../models/User";

const readAll = (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Get all users." });
};

const readUser = (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: `Get user with id ${req.params.userId}.` });
};

const createUser = (req: Request, res: Response, next: NextFunction) => {
  const data = req.body as IUser;
  return res.status(200).json({
    data,
  });
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const data = req.body as IUser;
  return res.status(200).json({
    data,
  });
};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Delete the user." });
};

export default {
  createUser,
  readUser,
  readAll,
  updateUser,
  deleteUser,
};
