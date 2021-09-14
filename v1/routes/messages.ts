import * as express from "express";
import * as messageController from "../controllers/messageController";

export const messageRouter = express.Router();

messageRouter.get("/:userId", messageController.messageList);
