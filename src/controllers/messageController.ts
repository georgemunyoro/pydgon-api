import * as express from "express";
import { Op } from "sequelize";
import { Message } from "../models/message";
import { getRequestAuthUser } from "./authController";

// Display list of all Message.
export async function messageList(req: express.Request, res: express.Response) {
  try {
    const [err, data] = await getRequestAuthUser(req);

    if (err) {
      return res.status(403).json({
        message: "Unauthorized",
        data: {
          errors: [data.message],
        },
      });
    }

    if (req.params.userId === "undefined") {
      return res.status(404).json({
        message: "Missing required parameters",
        data: {
          errors: ["uuid is undefined"],
        },
      });
    }

    await Message.sync();

    let messages;
    if (req.query.unread != null) {
      messages = await Message.findAll({
        where: {
          [Op.or]: [
            { sender: data.authenticatedUser.uuid, recepient: req.params.userId, read: false },
            { sender: req.params.userId, recepient: data.authenticatedUser.uuid, read: false },
          ],
        },
      });
    } else {
      messages = await Message.findAll({
        where: {
          [Op.or]: [
            { sender: data.authenticatedUser.uuid, recepient: req.params.userId },
            { sender: req.params.userId, recepient: data.authenticatedUser.uuid },
          ],
        },
      });
    }

    console.log(req.query);

    return res.status(200).json({
      message: "Messages",
      data: {
        messages: messages,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error ocurred",
      data: {
        error,
      },
    });
  }
}

// Display detail page for a specific Message.
export async function messageDetail(req, res) {
  res.send("NOT IMPLEMENTED: Message detail: " + req.params.id);
}
