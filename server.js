// import express and creating app
const express = require("express");
const app = express();

const dotEnv = require("dotenv");
dotEnv.config();

// connect to database
const dbConnection = require("./database/connection");
dbConnection.connect();

// middleware for converting request into json
app.use(express.json());

// register the router
app.use("/api/v1/users", require("./routers/userRouter"));
app.use("/api/v1/categories", require("./routers/categoryRouter"));
app.use("/api/v1/levels", require("./routers/levelRouter"));
app.use("/api/v1/languages", require("./routers/languageRouter"));
app.use("/api/v1/topics", require("./routers/topicRouter"));
app.use("/api/v1/subcategories", require("./routers/subCategoryRouer"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
