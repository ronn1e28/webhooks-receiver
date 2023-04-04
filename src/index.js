const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config/config");
const express = require("express");
const mongoose = require("mongoose");

//Setup Server
const app = express();
app.use(cors());
app.use(express.json());

// Set up mongoose
const db = config.MONGODB_URL;
mongoose.Promise = global.Promise;
mongoose
  .connect(db, {
    useNewUrlParser: true,
  })
  .then(
    () => {
      console.log("Database connected");
    },
    (error) => {
      console.log("Database could not be connected: " + error);
    }
  );

// Set up body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// // Set up the endpoints
const WebhookRoute = require("./routes/webhook.route");
app.use("/webhook", WebhookRoute);

// const authRoute = require("./routes/auth.route");

app.listen(3000);

module.exports = app;
