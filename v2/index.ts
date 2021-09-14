import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import { Http2ServerRequest } from "http2";
import logger from "morgan";
import { router } from "./routes";

const app = express();

const http = require("http").Server(app);

app.use(express.json());
app.use(logger("dev"));
app.use("/api/v2/", router);

const port: Number | string = process.env.PORT || 5000;
http.listen(port, () => {
  console.log(`Server is started on http://localhost:${port}`);
});

export default app;
