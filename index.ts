import { Socket } from "dgram";
import express from "express";
import { router } from "./src/routes";
import cors from 'cors';

const app = express();
app.use(cors())

let http = require("http").Server(app);
let io = require("socket.io")(http);

app.use(express.json());
app.use("/api/v1/", router);

io.on("connection", (socket: Socket) => {
  socket.on("chat-message", (msg: String) => {
    io.sockets.emit("chat-message", msg);
  });
});

const port: Number | string = process.env.PORT || 5000;
http.listen(port, () => {
  console.log("Server is started at http://localhost:" + port);
});
