import { use } from "chai";
import { Router } from "express";

import { authRouter } from "./auth";
import { userRouter } from "./users";

export const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);

router.get("/", (req: any, res: any) => {
  res.status(200).json({
    message: "ok",
  });
});
