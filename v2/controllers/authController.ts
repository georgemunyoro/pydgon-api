import * as express from "express";
import jwt from "jsonwebtoken";
import { createHash } from "crypto";
import { prisma } from "../db";
import { restore } from "sinon";

const secret = process.env.SECRET;

interface UserRegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
}

interface UserLoginFOrm {
  email: string;
  password: string;
}

interface JWT {
  id: number;
  iat: number;
  exp: number;
}

export async function registerUser(req: express.Request, res: express.Response) {
  const { firstName, lastName, email, userName, password }: UserRegistrationForm = req.body;

  try {
    const userExists: boolean = false;
    if (!userExists) {
      const hashedPassword = createHash("sha256").update(password).digest("base64");
      const newUser: UserRegistrationForm = {
        firstName,
        lastName,
        email,
        userName,
        password: hashedPassword,
      };

      const createdUser = await prisma.user.create({ data: newUser });

      return res.status(200).json({
        message: "registration successful",
        data: {
          createdUser,
        },
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "error",
      data: {
        // errors: [error.message],
      },
    });
  }
}

export async function loginUser(req: express.Request, res: express.Response) {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    const correctPassword =
      user?.password == createHash("sha256").update(password).digest("base64");
    if (correctPassword) {
      const token = jwt.sign({ id: user?.uuid }, secret!, {
        expiresIn: "24h",
      });

      return res.status(200).json({
        message: "auth successful",
        data: {
          token,
        },
      });
    }
  } catch (error) {}
}
