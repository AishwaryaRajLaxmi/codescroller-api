const mongoose = require("mongoose");
module.exports.connect = async () => {
  const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/codescroller";
  console.log(mongoUrl);
  
  try {
    const response = await mongoose.connect(mongoUrl);

    if (response) {
      console.log(
        `Database connected successfully \n Port:${response.connection.port}\nName:${response.connection.name}\nHost:${response.connection.host}`
      );
    }
  } catch (error) {
    console.log(`Database connection error\nError: ${error.message}`);
  }
};
