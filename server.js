// import express and creating app
const express = require("express");
const app = express();

// connect to database
const dbConnection = require("./database/connection");
dbConnection.connect();

// middleware for converting request into json
app.use(express.json());

const dotEnv = require("dotenv");
dotEnv.config();

// register the router
app.use("/api/v1/user", require("./routers/userRouter"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
