const bcryptjs = require("bcryptjs");
const optGenerator = require("../helpers/otpGenerator");
const userModel = require("../database/models/userModel");
const constants = require("../helpers/constants");
const { formatMongoData } = require("../helpers/dbHelper");
const jwt = require("jsonwebtoken");

// registerUser
module.exports.registerUser = async (serviceData) => {
  const response = {};
  try {
    // Check Email is already exist or not
    const userResponse = await userModel.findOne({
      email: serviceData.email,
    });

    if (userResponse) {
      response.errors = {
        email: constants.authMessage.EMAIL_EXISTS,
      };
      return response;
    }
    // encrypt password
    const hashPassword = await bcrypt.hash(newData.password, 10);
    newData.password = hashPassword;
    const serviceResponse = await newData.save();

    // send otp
    const currentDate = new Date();
    const otp = optGenerator.createOTP();
    const otpExpires = currentDate.setMinutes(currentDate.getMinutes() + 3);
    const newData = new userModel(serviceData);

    // getTimeandDate
    newData.otp = otp;
    newData.otpExpiredAt = otpExpires;

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
  const response = {
    errors: {},
  };
  try {
    // Find user

    const userData = await userModel.findOne({
      email: serviceData.email,
      isDeleted: false,
      status: true,
    });

    if (userData) {
      // Check password is matched or not
      const isCorrect = await bcryptjs.compare(
        serviceData.password,
        userData.password
      );
      if (isCorrect) {
        // Sign jwt token
        const token = jwt.sign(
          { id: userData._id },
          process.env.JWT_USER_SECRET_KEY,
          { expiresIn: "2 days" }
        );
        const formatData = userData.toObject();
        response.body = { ...formatData, token };
      } else {
        response.errors.password = constants.authMessage.INVALID_PASSWORD;
      }
    } else {
      response.errors.email = constants.authMessage.INVALID_EMAIL;
    }
  } catch (error) {
    console.log(
      `Something went wrong : service :userService :loginUser\nError:${error}`
    );
    throw new Error(error);
  }
  return response;
};

module.exports.isMobileExists = async (serviceData) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const userResponse = await userModel.findOne({
      mobile: serviceData.mobile,
    });

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
        error: constants.userMessage.USER_NOT_DELETED,
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
