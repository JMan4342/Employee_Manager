var dotenv = require("dotenv");
const express = require("express");
const mongodb = require("mongodb");
const { MongoClient, ObjectId } = require("mongodb");
const jwt = require('jsonwebtoken');
const UserLogin = require("../models/userLogin");

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
const COLLECTION = "userLogins";

const userLoginCollection = client.db(DB_NAME).collection(COLLECTION);

const userLoginRouter = express.Router();
userLoginRouter.use(express.json());
userLoginRouter.use(express.urlencoded({ extended: true }));

userLoginRouter.get("/getUserLogins", async (_req, res) => {
  try {
    const userLogins = await userLoginCollection.find({}).toArray();
    res.status(200).send(userLogins);
  } catch (error) {
    res
      .status(500)
      .send(error instanceof Error ? error.message : "Unknown error");
  }
});

userLoginRouter.get("/getUserLogin/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new ObjectId(id) };
    const userLogin = await userLoginCollection.findOne(query);

    if (userLogin) {
      res.status(200).send(userLogin);
    } else {
      res.status(404).send(`Failed to find a user login: ID ${id}`);
    }
  } catch (error) {
    res.status(404).send(`Failed to find a user login: ID ${req?.params?.id}`);
  }
});

userLoginRouter.post("/addUserLogin", async (req, res) => {
  try {
    const userLogin = req.body;
    const result = await userLoginCollection.insertOne(userLogin);

    if (result?.acknowledged) {
      res.status(201).send(`Created a new user login: ID ${result.insertedId}.`);
    } else {
      res.status(500).send("Failed to create a new user login.");
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send(error instanceof Error ? error.message : "Unknown error");
  }
});

userLoginRouter.post("/login", async (req, res) => {
    const query = { Username: req.body.Username, Password: req.body.Password };
    console.log(query);
    const user = await userLoginCollection.findOne(query);
    if (!user) {
        return res.status(422).json({ error: "Incorrect username or password" });
    } else if (user && user.AccessLevel < 3 && !user.ITAccess) {
        return res.status(422).json({ error: "Not authorized to access" });
    } else {
        const token = jwt.sign({ id: user._id, username: user.Username }, 'secretsquirrel');
        res.status(200).send(token);
    }
})

userLoginRouter.put("/updateUserLogin/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const userLogin = req.body;
    const query = { _id: new ObjectId(id) };
    const result = await userLoginCollection.updateOne(query, { $set: userLogin });

    if (result && result.matchedCount) {
      res.status(200).send(`Updated a user login: ID ${id}.`);
    } else if (!result?.matchedCount) {
      res.status(404).send(`Failed to find a user login: ID ${id}.`);
    } else {
      res.status(304).send(`Failed to update a user login: ID ${id}.`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.log(message);
    res.status(400).send(message);
  }
});

userLoginRouter.delete("/deleteUserLogin/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new ObjectId(id) };
    const result = await userLoginCollection.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Removed a user login: ID ${id}.`);
    } else if (!result) {
      res.status(400).send(`Failed to remove a user login: ID ${id}.`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Failed to find a user login: ID ${id}.`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.log(message);
    res.status(400).send(message);
  }
});

module.exports = userLoginRouter;