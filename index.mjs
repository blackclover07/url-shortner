import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import urlRouter from "./routes/url.mjs";
import staticRouter from "./routes/staticRouter.mjs";
import userRouter from "./routes/user.mjs";
import cookieParser from "cookie-parser";
import {restrictToLoggedinUserOnly,checkAuth} from "./middlewares/auth.mjs";
import path from "path";
const PORT =process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/url",restrictToLoggedinUserOnly, urlRouter);
app.use("/", checkAuth,staticRouter);
app.use("/user", userRouter);
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// database connection and server port configuration
mongoose
  .connect(`${process.env.MONGO_DB_URI}/urlshortner`)
  .then(() => {
    console.log("database connected");
    app.listen(PORT, () => console.log(`server started at ${PORT}`));
  });
