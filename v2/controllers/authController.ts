import * as express from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { createHash } from "crypto";
import { prisma } from "../db";
import { restore } from "sinon";
import { Prisma } from "@prisma/client";
import { access } from "fs";

const SECRET = process.env.SECRET;
const SECRET2 = process.env.SECRET2;

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
  id: string;
  iat: number;
  exp: number;
}

export const createTokens = (user: Prisma.UserSelect, secret, secret2) => {
  return Object.freeze({
    accessToken: jwt.sign(
      {
        user: user.uuid,
      },
      secret,
      {
        expiresIn: "10m",
      }
    ),
    refreshToken: jwt.sign(
      {
        user: user.uuid,
      },
      secret2,
      {
        expiresIn: "7d",
      }
    ),
  });
};

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
      const tokens = createTokens(user, SECRET, SECRET2);

      return res.status(200).json({
        message: "auth successful",
        data: {
          ...tokens,
        },
      });
    }
  } catch (error) {}
}

export const refreshTokens = async (
  accessToken,
  refreshToken,
  accessTokenSecret,
  refreshTokenSecret
) => {
  try {
    const token = jwt.decode(refreshToken);
    if (token && typeof token != "string") {
      const user = await prisma.user.findUnique({
        where: {
          uuid: token.user,
        },
      });

      if (!user) return {};

      // refreshTokenSecret = refreshTokenSecret + user.password;

      try {
        jwt.verify(refreshToken, refreshTokenSecret);
      } catch (error) {
        return {};
      }

      const newTokens = createTokens({ uuid: token.id }, accessTokenSecret, refreshTokenSecret);

      return {
        refreshToken: newTokens.refreshToken,
        accessToken: newTokens.accessToken,
        user,
      };
    }
  } catch (error) {}
};
