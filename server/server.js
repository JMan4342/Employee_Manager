var dotenv = require("dotenv");
const express = require("express");
const app = express();
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
var port = process.env.PORT || 8080;
var userLoginRoutes = require("./routes/userLoginRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(
//   express.static(
//     path.join(__dirname, "../client/dist/pizza-shop-manager/browser")
//   )
// );

app.use("/api/userLogins", userLoginRoutes);

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
  console.error(
    "No ATLAS_URI environment variable has been defined in config.env"
  );
  process.exit(1);
}

const client = new MongoClient(ATLAS_URI);
const DB_NAME = "employeeManagement";

app.listen(port, () => {
  console.log("Server is listening", port);
  client.connect();
  client.db(DB_NAME);
  console.log("Connection successfully established", DB_NAME);
});