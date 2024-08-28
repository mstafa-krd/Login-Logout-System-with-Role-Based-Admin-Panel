if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv").config();
}
const express = require("express");
const mongoose = require("mongoose");
const { MongoURI } = require("./config/keys");
const authRouter = require("./routes/auth");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const userRouter = require("./routes/user");
const tasksRouter = require("./routes/tasks");

const port = process.env.PORT;
const app = express();
app.use(express.json());

app.use(cors({ origin: "http://localhost:5173", credentials: true })); // this allows you to conect with frontend this is a must
// Passport Config
require("./config/passport")(passport);

//DB Config
const db = MongoURI;

// CONNECT TO DB
mongoose
  .connect(db)
  .then(() => {
    console.log("connection to DB success");
  })
  .catch((e) => {
    console.log(e);
  });

//bodyparser
app.use(express.urlencoded({ extended: false }));

//passport & session

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

//router
app.get("/", (req, res) => res.send("the server is working"));
app.use("/api", authRouter);
app.use("/api/user", userRouter);
app.use("/api/task", tasksRouter);

app.listen(port, console.log(`server running on port ${port}`));
