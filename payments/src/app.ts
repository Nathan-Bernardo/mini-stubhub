import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
  errorhandler,
  NotFoundError,
  currentUser,
} from "@stubhubtickets/common";
import { createChargerRouter } from "./routes/new";

const app = express();

app.set("trust proxy", true); // traffic is being proxied to our application through ingress-nginx
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test", //https
  })
);

app.use(currentUser);
app.use(createChargerRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorhandler);

export { app };
