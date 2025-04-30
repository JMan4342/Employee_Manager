const mongoose = require('mongoose');
const mongodb = require('mongodb');

const EmployeeProfileSchema = mongoose.Schema ({
  _Id: {
    type: mongodb.ObjectId,
    required: true
  },
  EmpId: {
    type: Number,
  },
  FirstName: {
    type: String,
  },
  LastName: {
    type: String,
  },
  FullName: {
    type: String,
  },
  AccessLevel: {
    type: Number,
  },
  Manager: {
    type: String,
  },
  Position: {
    type: String,
  },
  Title: {
    type: String,
  },
  Archived: {
    type: Boolean,
  },
  StartDate: {
    type: Date,
  },
  Department: {
    type: String
  },
  Username: {
    type: String
  }
});

mongoose.model('EmployeeProfile', EmployeeProfileSchema);