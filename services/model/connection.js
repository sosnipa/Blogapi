const mongoose = require("mongoose");
require("dotenv").config();

function connectToMongoDB() {
  const { MONGODB_URI } = process.env;

  mongoose.connect(MONGODB_URI);

  mongoose.connection.on("connected", () => {
    console.log("Connection to MongoDB successful");
  });

  mongoose.connection.on("error", (error) => {
    console.log("Error connecting to Mongodb", err);
  });
}

module.exports = { connectToMongoDB };
