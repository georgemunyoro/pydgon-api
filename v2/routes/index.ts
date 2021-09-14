import { Router } from "express";

// import { authRouter } from "./auth";
// import { userRouter } from "./users";
// import { messageRouter } from "./messages";
// import { contactRouter } from "./contacts";

export const router = Router();

// router.use("/auth", authRouter);
// router.use("/users", userRouter);
// router.use("/messages", messageRouter);
// router.use("/contacts", contactRouter);

router.get("/", (req: any, res: any) => {
  res.status(200).json({
    message: "ok",
  });
});
