const { default: mongoose } = require("mongoose");

require('dotenv').config()

const url = process.env.MONGODB_URL;

const db = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

module.exports = db;
