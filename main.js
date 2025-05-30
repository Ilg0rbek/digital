const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index.routes");
const path = require("path");

const app = express();


app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", mainRouter);

let PORT = config.get("PORT") ?? 4000;

async function bootsrapt() {
  try {
    await mongoose.connect(config.get("DB_URI"));
    console.log(`Connect to db successfully ✅`);
    app.listen(PORT,'0.0.0.0' ,() => {
      console.log(`Server running on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
}

bootsrapt();
