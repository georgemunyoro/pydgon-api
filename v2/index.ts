import { prisma } from "@prisma/client";
import cors from "cors";
import { Socket } from "dgram";
import * as dotenv from "dotenv";
import express from "express";
import { Http2ServerRequest } from "http2";
import logger from "morgan";
import { router } from "./routes";
import { socketHandler } from "./ws";

const app = express();

const http = require("http").Server(app);
const io = require("socket.io")(http);
const socketioJwt = require("socketio-jwt");

app.use(express.json());
app.use(logger("dev"));
app.use("/api/v2/", router);

// io.use(
//   socketioJwt.authorize({
//     secret: process.env.SECRET3,
//     handshake: true,
//   })
// );

io.on("connection", socketHandler);

const port: Number | string = process.env.PORT || 5000;
http.listen(port, () => {
  console.log(`Server is started on http://localhost:${port}`);
});

export default app;
