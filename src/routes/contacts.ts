import * as express from "express";
import * as contacts from "../controllers/contactController";

export const contactRouter = express.Router();

contactRouter.get("/", contacts.contactList);
contactRouter.post("/:uuid", contacts.createContactPost);
