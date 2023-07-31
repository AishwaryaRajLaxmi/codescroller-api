// import express and creating app
const express = require("express");
const app = express();
const cors = require("cors");

const dotEnv = require("dotenv");
dotEnv.config();

// connect to database
const dbConnection = require("./database/connection");
dbConnection.connect();

// middleware for converting request into json
app.use(cors());
app.use(express.json());

// register the router
app.use("/api/v1/users", require("./routers/userRouter"));
app.use("/api/v1/admins", require("./routers/adminRouter"));
app.use("/api/v1/categories", require("./routers/categoryRouter"));
app.use("/api/v1/levels", require("./routers/levelRouter"));
app.use("/api/v1/languages", require("./routers/languageRouter"));
app.use("/api/v1/topics", require("./routers/topicRouter"));
app.use("/api/v1/subcategories", require("./routers/subCategoryRouer"));

app.use("/api/v1/courses", require("./routers/courseRouter"));
app.use("/api/v1/reviews", require("./routers/reveiwRouter"));
app.use("/api/v1/lessons", require("./routers/lessonRouter"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
