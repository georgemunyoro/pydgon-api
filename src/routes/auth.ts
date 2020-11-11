import * as express from "express";
import { check, validationResult } from "express-validator";
import { User } from "../models/user";
import { createHash } from "crypto";

export const authRouter = express.Router();

import * as userController from "../controllers/userController";
import * as authController from "../controllers/authController";

authRouter.get("/drop", async (req: express.Request, res: express.Response) => {
  User.drop();

  res.status(200).json({
    message: "Dropped User DB",
  });
});

authRouter.get('/', authController.authenticatedUser);

authRouter.post(
  "/register",
  [
    check(["firstname", "lastname", "username"])
      .isLength({ min: 2 })
      .withMessage("Firstname must contain at least 2 letters")
      .trim(),

    check("email").isEmail().withMessage("Invalid email adress").normalizeEmail(),

    check("password")
      .isLength({ min: 8, max: 100 })
      .withMessage("Password should be between 8 and 100 characters")
      .matches(/\d/)
      .withMessage("Password must contain at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("Password should contain at least one special character"),

    check("confirmPassword").custom((value, { req }): boolean | null => {
      if (value !== req.body.password) {
        throw new Error("Passwords should match");
      }
      return true;
    }),
  ],
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const error = validationResult(req).formatWith(({ msg }) => msg);
    if (!error.isEmpty()) {
      return res.status(422).json({
        error: error.array(),
      });
    }

    next();
  },
  authController.registerUser
);

authRouter.post("/login", [
  check('email')
    .isEmail()
    .withMessage('Invalid email adress')
    .normalizeEmail(),
], (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const error = validationResult(req).formatWith(({ msg }) => msg);
  if (!error.isEmpty()) {
    return res.status(422).json({
      message: 'An error ocurred',
      data: {
        error: error.array(),
      },
    });
  }

  next();
}, authController.loginUser);
