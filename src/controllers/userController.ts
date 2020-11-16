import * as express from "express";
import { User } from "../models/user";

// Display list of all Users
export async function userList(req, res) {
  try {
    await User.sync();
    const users = await User.findAll({
      attributes: ["username", "uuid"],
    });

    res.status(200).json({
      message: "User List",
      data: {
        users,
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

// Display detail page for a specific User.
export async function userDetail(req: express.Request, res: express.Response) {
  try {
    const uuid = req.params.userId;

    await User.sync();
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
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error has ocurred",
      data: {
        error,
      },
    });
  }
}
