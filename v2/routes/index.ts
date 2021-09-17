import { prisma } from "../db";
import * as express from "express";
import jwt from "jsonwebtoken";
import { refreshTokens } from "../controllers/authController";

import { authRouter } from "./auth";
import { userRouter } from "./users";

export const router = express.Router();

const SECRET: string = process.env.SECRET || "SECRET";
const SECRET2: string = process.env.SECRET2 || "SECRET2";

const addUser = async (req: express.Request, res: express.Response, next: () => any) => {
  if (req.url.startsWith("/auth")) {
    next();
  } else {
    const accessToken: string | string[] | undefined = req.headers["x-token"];

    if (accessToken && typeof accessToken == "string") {
      try {
        const token: any = jwt.verify(accessToken, SECRET);
        req["user"] = await prisma.user.findUnique({
          where: {
            uuid: token.user,
          },
        });
      } catch (error) {
        console.log("err");
        const refreshToken = req.headers["x-refresh-token"];
        const newTokens = await refreshTokens(accessToken, refreshToken, SECRET, SECRET2);
        if (newTokens) {
          if (newTokens.accessToken && newTokens.refreshToken) {
            res.set("Access-Control-Expose-Headers", "x-token, x-refresh-token");
            res.set("x-token", newTokens.accessToken);
            res.set("x-refresh-token", newTokens.refreshToken);
          }
          req["user"] = newTokens.user;
        }
      }
    }

    next();
  }
};

router.use(addUser);

router.use("/auth", authRouter);
router.use("/users", userRouter);

router.get("/", (req: any, res: any) => {
  res.status(200).json({
    message: "ok",
  });
});
