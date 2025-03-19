const mongoose = require('mongoose');
const mongodb = require('mongodb');

const UserLoginSchema = mongoose.Schema ({
  _Id: {
    type: mongodb.ObjectId,
    required: true
  },
  empId: {
    type: Number,
  },
  Username: {
    type: String,
  },
  Password: {
    type: String,
  },
  AccessLevel: {
    type: Number,
  },
  ITAccess: {
    type: Boolean,
  },
});

mongoose.model('UserLogin', UserLoginSchema);