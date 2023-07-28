const bcrypt = require("bcrypt");
const optGenerator = require("../helpers/otpGenerator");
const userModel = require("../database/models/userModel");
const constants = require("../helpers/constants");
const { formatMongoData } = require("../helpers/dbHelper");

// registerUser
module.exports.registerUser = async (serviceData) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const userResponse = await userModel.findOne({
      email: serviceData.email,
      isDeleted: false,
      status: true,
    });

    if (userResponse) {
      response.errors = {
        email: "Email already exists",
        status: 400,
      };
      return response;
    }

    // send otp
    const currentDate = new Date();
    const otp = optGenerator.createOTP();
    const otpExpires = currentDate.setMinutes(currentDate.getMinutes() + 3);
    const newData = new userModel(serviceData);

    // getTimeandDate
    newData.otp = otp;
    newData.otpExpiredAt = otpExpires;

    // encrypt password
    const hashPassword = await bcrypt.hash(newData.password, 10);
    newData.password = hashPassword;
    const serviceResponse = await newData.save();
    return serviceResponse;
  } catch (error) {
    console.log(
      `Something went wrong service : userService : registerUser\nError: ${error.message}`
    );
    throw new Error(error.message);
  }
};

// loginUser
module.exports.loginUser = async (serviceData) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const userResponse = await userModel.findOne({
      email: serviceData.email,
      isDeleted: false,
      status: true,
    });

    if (!userResponse) {
      response.errors = {
        email: "user not found",
        status: 400,
      };
      return response;
    }

    // compare the password
    const isMatch = await bcrypt.compare(
      serviceData.password,
      userResponse.password
    );

    if (isMatch) {
      return userResponse;
    }
  } catch (error) {
    console.log(
      `Something went wrong : service :userService :loginUser\nError:${error}`
    );
    throw new Error(error);
  }
};

module.exports.isMobileExists = async (serviceData) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const userResponse = await userModel.findOne({
      mobile: serviceData.mobile,
    });

    console.log(serviceData.mobile);

    if (userResponse) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(
      `Something went wrong : service :userService:isMobileExists\nError:${error}`
    );
    throw new Error(error);
  }
};

// isEmailExists
module.exports.isEmailExists = async (serviceData) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const userResponse = await userModel.findOne({
      email: serviceData.email,
    });

    console.log(serviceData.email);

    if (userResponse) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(
      `Something went wrong : service :userService:isEmailExists\nError:${error}`
    );
    throw new Error(error);
  }
};

// getAllUsers
module.exports.getAllUsers = async (serviceData) => {
  try {
    const {
      limit = 10,
      page = 1,
      status = "true",
      isVerified,
      searchQuery,
    } = serviceData;
    let conditions = {};

    // Set the condition for active users (where isDeleted is false)
    conditions.isDeleted = false;

    // Verification condition
    if (isVerified == "true" || isVerified == "false")
      conditions.isVerified = isVerified;

    // status condition
    if (status == "true" || status == "false") {
      conditions.status = status;
    }

    // search query
    if (searchQuery) {
      const regex = new RegExp(searchQuery, "i");
      conditions.$or = [{ name: regex }, { email: regex }, { mobile: regex }];
    }

    // count document
    const totalRecords = await userModel.countDocuments(conditions);
    const totalPages = Math.ceil(totalRecords / parseInt(limit));

    const dbResponse = await userModel
      .find(conditions)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    const formatData = formatMongoData(dbResponse);
    return {
      body: formatData,
      totalPages,
      totalRecords,
      page,
    };
  } catch (error) {
    console.log(
      `Something went wrong: Service: userService: getAllUsers\nError: ${error.message}`
    );
    throw new Error(error);
  }
};

// deleteUser
module.exports.deleteUser = async (serviceData) => {
  try {
    const response = { ...constants.defaultServerResponse };

    const dbResponse = await userModel.findOneAndUpdate(
      { _id: serviceData.id }, // Condition to find the document
      { isDeleted: true }, // Update to set isDeleted field to true
      { new: true } // Options to return the updated document
    );

    if (!dbResponse) {
      response.errors = {
        error: constants.UserMessage.USER_NOT_DELETED,
      };
      return response;
    }

    response.body = dbResponse;
    response.status = 200;

    return response;
  } catch (error) {
    console.log(`Something went wrong: service : userService : deleteUser`);
    throw new Error(error);
  }
};

// getUserById
module.exports.getUserById = async (serviceData) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const dbResponse = await userModel.findById(serviceData.id);
    const formatData = formatMongoData(dbResponse);
    return formatData;
  } catch (error) {
    console.log(`Something went wrong: service : userService : deleteUser`);
    throw new Error(error);
  }
};

// UpdateUser

module.exports.updateUser = async (serviceData) => {
  try {
    const { id, body } = serviceData;
    const dbResponse = await userModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return formatMongoData(dbResponse);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: updateService: updateUser`,
      error.message
    );
    throw new Error(error);
  }
};
