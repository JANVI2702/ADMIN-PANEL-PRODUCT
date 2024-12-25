const express = require("express");
const path = require("path");
const db = require("./config/database");
const bodyParser = require("body-parser");
const LocalStrategy = require("./middleware/passport");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require('cookie-parser')
const port = 8081;

const app = express();

app.set("view engine", "ejs");

app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));
app.use(express.static(path.join(__dirname + "/assets")));
app.use(bodyParser.urlencoded({ extended: true }));


app.use(
  session({
    secret: "user",
    resave: true,
    saveUninitialized: false,
    cookie: { MaxAge: 1000 * 60 * 60 },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setuserAuth);

app.use("/", require("./routers"));

app.listen(port, (err) => {
  if (!err) {
    db();
    console.log("Server is running on http://localhost:" + port);
  }
});
