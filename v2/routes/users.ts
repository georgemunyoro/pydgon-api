import { Prisma } from "@prisma/client";
import * as express from "express";
import { generatePublicUserProfile, generatePrivateUserProfile } from "../utils/user";
import { prisma } from "../db";

export const userRouter = express.Router();

userRouter.get("/me", (req: express.Request, res: express.Response) => {
  if (!req["user"]) {
    res.status(500).json({
      message: "an unexpected error ocurred",
    })
  }

  res.status(200).json({
    message: "ok",
    data: generatePrivateUserProfile(req["user"]),
  });
});

userRouter.get("/:userId", async (req: express.Request, res: express.Response) => {
  const userId = req.params.userId;
  const user:  = await prisma.user.findUnique({
    where: {
      uuid: userId,
    },
  });

  if (!user || user === null) {
    res.status(500).json({
      message: "an unexpected error ocurred",
    });
  }
  if (user != null) {
    res.status(200).json({
      message: "ok",
      data: generatePublicUserProfile(user),
    });
  }
});
