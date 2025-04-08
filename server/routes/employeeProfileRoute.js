var dotenv = require("dotenv");
const express = require("express");
const mongodb = require("mongodb");
const { MongoClient, ObjectId } = require("mongodb");
const jwt = require('jsonwebtoken');
const EmployeeProfile = require("../models/employeeProfile")

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
const COLLECTION = "employeeProfiles";

const employeeProfileCollection = client.db(DB_NAME).collection(COLLECTION);

const employeeProfileRouter = express.Router();
employeeProfileRouter.use(express.json());
employeeProfileRouter.use(express.urlencoded({ extended: true }));

employeeProfileRouter.get("/getEmployeeProfiles", async (_req, res) => {
  try {
    const employeeProfiles = await employeeProfileCollection.find({}).toArray();
    res.status(200).send(employeeProfiles);
  } catch (error) {
    res
      .status(500)
      .send(error instanceof Error ? error.message : "Unknown error");
  }
});

employeeProfileRouter.get("/getEmployeeProfile/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new ObjectId(id) };
    const employeeProfile = await employeeProfileCollection.findOne(query);

    if (employeeProfile) {
      res.status(200).send(employeeProfile);
    } else {
      res.status(404).send(`Failed to find an employee profile: ID ${id}`);
    }
  } catch (error) {
    res.status(404).send(`Failed to find an employee profile: ID ${req?.params?.id}`);
  }
});

employeeProfileRouter.post("/addEmployeeProfile", async (req, res) => {
  try {
    const employeeProfile = req.body;
    const result = await employeeProfileCollection.insertOne(employeeProfile);

    if (result?.acknowledged) {
      res.status(201).send(`Created a new employee profile: ID ${result.insertedId}.`);
    } else {
      res.status(500).send("Failed to create a new employee profile.");
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send(error instanceof Error ? error.message : "Unknown error");
  }
});

employeeProfileRouter.put("/updateEmployeeProfile/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const employeeProfile = req.body;
    const query = { _id: new ObjectId(id) };
    const result = await employeeProfileCollection.updateOne(query, { $set: employeeProfile });

    if (result && result.matchedCount) {
      res.status(200).send(`Updated an employee profile: ID ${id}.`);
    } else if (!result?.matchedCount) {
      res.status(404).send(`Failed to find an employee profile: ID ${id}.`);
    } else {
      res.status(304).send(`Failed to update an employee profile: ID ${id}.`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.log(message);
    res.status(400).send(message);
  }
});

employeeProfileRouter.delete("/deleteEmployeeProfile/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new ObjectId(id) };
    const result = await employeeProfileCollection.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Removed an employee profile: ID ${id}.`);
    } else if (!result) {
      res.status(400).send(`Failed to remove an employee profile: ID ${id}.`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Failed to find an employee profile: ID ${id}.`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.log(message);
    res.status(400).send(message);
  }
});

module.exports = employeeProfileRouter;