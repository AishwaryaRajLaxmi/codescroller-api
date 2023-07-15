const bcrypt = require("bcrypt");
const userModel = require("../database/models/userModel");

// registerUser
module.exports.registerUser = async (serviceData) => {
  try {
    const userResponse = await userModel.findOne({ email: serviceData.email });

    if (userResponse) {
      throw new Error("User Already Exists");
    }
    const newData = new userModel(serviceData);

    // encrypt password
    const hashPassword = await bcrypt.hash(newData.password, 10);
    newData.password = hashPassword;
    const response = await newData.save();
    return response;
  } catch (error) {
    console.log(
      `Something went wrong service : userService : registerUser\nError: ${error.message}`
    );
    throw new Error(error.message);
  }
};

// getAllUser
module.exports.getAllUser = async (serviceData) => {
  const { skip = 0, limit = 10 } = serviceData;
  try {
    const response = await userModel
      .find()
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    return response;
  } catch (error) {
    console.log(
      `Something went wrong :Service :userService :getAllUser\nError:${error.message}`
    );
    throw new Error(error.message);
  }
};
