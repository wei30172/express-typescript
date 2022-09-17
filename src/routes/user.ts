import express from "express";
import { NextFunction, Request, Response } from "express";
import controller from "../controllers/user";
import { Schemas, ValidateJoi } from "../middleware/Joi";

const router = express.Router();

router
  .route("/")
  .get(controller.readAll)
  .post(ValidateJoi(Schemas.user.create), controller.createUser);

router
  .route("/:userId")
  .get(controller.readUser)
  .put(ValidateJoi(Schemas.user.update), controller.updateUser)
  .delete(controller.deleteUser);

router.param(
  "userId",
  (req: Request, res: Response, next: NextFunction, userId: number) => {
    // res.user = users[userId];
    console.log(userId);
    next();
  }
);
export default router;
