import * as express from "express";
import { Op } from "sequelize";
import { Contact } from "../models/contact";
import { User } from "../models/user";
import { getRequestAuthUser } from "./authController";

// Display list of all Contacts.
export async function contactList(req: express.Request, res: express.Response) {
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

    let contacts: any = await Contact.findAll({
      attributes: { exclude: ["user"] },
      where: {
        user: data.authenticatedUser.uuid,
      },
    });

    return res.status(200).json({
      message: "Contact List",
      data: {
        contacts,
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
export async function contactDetail(req, res) {
  res.send("NOT IMPLEMENTED: Message detail: " + req.params.id);
}

// Create a contact
export async function createContactPost(req: express.Request, res: express.Response) {
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

    const user = await User.findOne({ where: { uuid: req.params.uuid } });

    const contact = await Contact.create({
      user: data.authenticatedUser.uuid,
      contact: req.params.uuid,
      name: user?.getDataValue("username"),
    });

    return res.status(200).json({
      message: "Created Contact",
      data: {
        contact,
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