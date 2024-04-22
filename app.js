const express = require("express");
require("dotenv").config();
const app = express();
const errorHandler = require("./middleware/error.middleware.js");
const { connectToMongoDB } = require("./model/connection");
const authenticationRoute = require("./routes/auth.route");
const blogRoute = require("./routes/blog.route");

const PORT = process.env.PORT;

connectToMongoDB();

app.use(express.json());

app.use("/auth", authenticationRoute);
app.use("/blogs", blogRoute);

//Catch all route
app.all("*", (req, res) => {
  res.status(404);
  res.json({
    message: "404 Page Not found",
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
