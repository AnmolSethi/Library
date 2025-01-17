// Importing modules
require("dotenv").config();
const express = require("express");
const app = express();
const expressLayout = require("express-ejs-layouts");
const indexRouter = require("./routes/index");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayout);
app.use(express.static("public"));

// Database Setup
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

// Initial Route
app.use("/", indexRouter);

// Listenting to the Server
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on http://localhost:30000");
});
