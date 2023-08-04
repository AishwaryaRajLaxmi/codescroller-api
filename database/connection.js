const mongoose = require("mongoose");
module.exports.connect = async () => {
  const mongoUrl =
    process.env.MONGO_URL || "mongodb://127.0.0.1:27017/codescroller";

  try {
    const response = await mongoose.connect(mongoUrl);

    if (response) {
      console.log(
        `Database connected successfully \n Port:${response.connection.port}\n Name:${response.connection.name}\n Host:${response.connection.host}`
      );
    }
  } catch (error) {
    console.log(`Database connection error\nError: ${error}`);
  }
};
