import * as express from "express";
import { check, validationResult } from "express-validator";
import { User } from "../models/user";

export const authRouter = express.Router();

import * as userController from "../controllers/userController";
import * as authController from "../controllers/authController";

authRouter.get("/", authController.authenticatedUser);

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

authRouter.post(
  "/register",
  [
    check(["firstname", "lastname", "username"])
      .isLength({ min: 2 })
      .withMessage((value, { path }) => `${capitalize(path)} should contain at least 2 characters`)
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
        errors: error.array(),
      });
    }

    next();
  },
  authController.registerUser
);

authRouter.post(
  "/login",
  [check("email").isEmail().withMessage("Invalid email adress").normalizeEmail()],
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
	const error = validationResult(req).formatWith(({ msg }) => msg);
	if (!error.isEmpty()) {
	  return res.status(422).json({
		message: "An error ocurred",
		data: {
		  errors: error.array(),
		},
	  });
	}

	next();
  },
  authController.loginUser
);
