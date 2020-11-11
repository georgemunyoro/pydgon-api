import * as express from "express";
import { User } from "../models/user";

// Display list of all Users
export async function userList(req, res) {
  const users = await User.findAll({
    attributes: ["username", "uuid"],
  });

  res.status(200).json({
    message: "User List",
    data: {
      users,
    },
  });
}

// Display detail page for a specific User.
export async function userDetail(req: express.Request, res: express.Response) {
  const uuid = req.params.userId;
  const user = await User.findOne({
    where: { uuid },
    attributes: { exclude: ["email", "password"] },
  });

  return res.status(200).json({
    message: "User Detail",
    data: {
      user,
    },
  });
}
