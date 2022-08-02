import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { errorhandler, NotFoundError } from "@stubhubtickets/common";

const app = express();

app.set("trust proxy", true); // traffic is being proxied to our application through ingress-nginx
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false, //https
  })
);

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorhandler);

export { app };
