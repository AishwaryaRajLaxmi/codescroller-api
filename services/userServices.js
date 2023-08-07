const bcryptjs = require("bcryptjs");
const optGenerator = require("../helpers/otpGenerator");
const userModel = require("../database/models/userModel");
const constants = require("../helpers/constants");
const { formatMongoData } = require("../helpers/dbHelper");
const jwt = require("jsonwebtoken");
const smsHelper = require("../helpers/smsHelper");
const _ = require("lodash");
// registerUser
module.exports.registerUser = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    // Check Email is already exist or not
    const userResponse = await userModel.findOne({
      email: serviceData.email,
    });

    if (userResponse) {
      // disabled account
      if (userResponse.status === false) {
        response.errors = {
          email: "Your account has been disabled",
        };
        response.message = "Your account has been disabled";
        return response;
      }

      // for deleted account
      if (userResponse.isDeleted === true) {
        response.errors = {
          email: "Your account has been deleted",
        };
        response.message = "Your account has been deleted";
        return response;
      }

      // if account is not verified
      if (userResponse.isVerified == false) {
        // generate otp
        const currentDate = new Date();
        const otp = optGenerator.createOTP();
        const otpExpires = currentDate.setMinutes(currentDate.getMinutes() + 3);

        const updateResponse = await userModel.findOneAndUpdate(
          { _id: userResponse._id },
          {
            otp: otp,
            otpExpiredAt: otpExpires,
          },
          { new: true }
        );

        if (updateResponse) {
          // send otp
          const smsResponse = await smsHelper.sendOTPEmail({
            emailTo: userResponse.email,
            subject: "OTP Verification",
            name: userResponse.name,
            otp,
          });

          if (smsResponse.status == true) {
            response.body = formatMongoData(userResponse);
            response.message = "An OTP has been sent on your Email";
            response.status = 200;
          } else {
            response.message = smsResponse.message;
            response.errors.error = smsResponse.message;
          }

          return response;
        } else {
          response.errors = {
            error: constants.userMessage.USER_NOT_REGISTERED,
          };
          response.message = constants.userMessage.USER_NOT_REGISTERED;
          return response;
        }
      }

      // if account is verified
      if (userResponse.isVerified == true) {
        response.message = "You have already registered";
        response.errors.error = "Your Email is already registered";
        response.status = 400;
        return response;
      }
    }

    // generate otp
    const currentDate = new Date();
    const otp = optGenerator.createOTP();
    const otpExpires = currentDate.setMinutes(currentDate.getMinutes() + 3);

    // encrypt password
    const hashPassword = await bcryptjs.hash(serviceData.password, 10);
    const newData = new userModel(serviceData);
    newData.password = hashPassword;
    newData.otp = otp;
    newData.otpExpiredAt = otpExpires;

    const dbResponse = await newData.save();

    if (dbResponse) {
      // send otp
      const smsResponse = await smsHelper.sendOTPEmail({
        emailTo: dbResponse.email,
        subject: "OTP Verification",
        name: dbResponse.name,
        otp,
      });

      if (smsResponse.status == true) {
        response.body = formatMongoData(dbResponse);
        response.message = "An OTP has been sent on your Email";
        response.status = 200;
      } else {
        response.message = smsResponse.message;
        response.errors.error = smsResponse.message;
      }

      return response;
    } else {
      response.errors = {
        error: constants.userMessage.USER_NOT_REGISTERED,
      };
      response.message = constants.userMessage.USER_NOT_REGISTERED;
    }

    return response;
  } catch (error) {
    console.log(
      `Something went wrong service : userService : registerUser\nError: ${error.message}`
    );
    throw new Error(error.message);
  }
};

// verifyAccount
module.exports.verifyAccount = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const userResponse = await userModel.findOne({
      email: serviceData.email,
    });

    if (userResponse) {
      if (userResponse.otp == serviceData.otp) {
        const otpExpiry = new Date(userResponse.otpExpiredAt);
        const currentDate = new Date();
        const timeDistance = otpExpiry - currentDate;
        if (timeDistance < 0) {
          response.errors.otp = "Your otp has expired, please resend your otp";
          response.message = "Your otp has expired, please resend your otp";
          return response;
        }

        // update data to database
        const dbResponse = await userModel.findOneAndUpdate(
          { _id: userResponse._id },
          { isVerified: true },
          { new: true }
        );

        if (dbResponse) {
          // generate token
          const token = jwt.sign(
            { id: userResponse._id },
            process.env.JWT_USER_SECRET_KEY
          );
          const formatData = dbResponse.toObject();
          response.status = 200;
          response.message = "Congratulations! You account is verified";
          response.body = { ...formatData, token };
        } else {
          response.message = "Oops, something went wrong While updating data";
          response.errors.error =
            "Oops, something went wrong While updating data";
        }
      } else {
        response.errors.otp = "You entered an invalid OTP";
        response.message = "You entered an invalid OTP";
      }
    } else {
      response.errors.error = "Invalid Credentials, Please try again";
      response.message = "Invalid Credentials, Please try again";
    }
    return response;
  } catch (error) {
    console.log(
      `Something went wrong : service :userService:verifyAccount\nError:${error}`
    );
    throw new Error(error);
  }
};

// findAccountAndSendOTP
module.exports.findAccountAndSendOTP = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    // Check Email is already exist or not
    const userResponse = await userModel.findOne({
      email: serviceData.email,
    });

    if (userResponse) {
      // disabled account
      if (userResponse.status === false) {
        response.errors = {
          email: "Your account has been disabled",
        };
        response.message = "Your account has been disabled";
        return response;
      }

      // for deleted account
      if (userResponse.isDeleted === true) {
        response.errors = {
          email: "Your account has been deleted",
        };
        response.message = "Your account has been deleted";
        return response;
      }

      // generate otp
      const currentDate = new Date();
      const otp = optGenerator.createOTP();
      const otpExpires = currentDate.setMinutes(currentDate.getMinutes() + 3);

      // update otp and expires
      const dbResponse = await userModel.findOneAndUpdate(
        {
          _id: userResponse._id,
        },
        { otp, otpExpiredAt: otpExpires }
      );

      if (dbResponse) {
        // send otp
        const smsResponse = await smsHelper.sendOTPEmail({
          emailTo: userResponse.email,
          subject: "OTP Verification",
          name: userResponse.name,
          otp,
        });

        if (smsResponse.status == true) {
          response.body = serviceData;
          response.message = "An OTP has been sent on your Email";
          response.status = 200;
        } else {
          response.message = smsResponse.message;
          response.errors.error = smsResponse.message;
        }
      } else {
        response.message = "Oops! Something went wrong, While update OTP";
        response.errors.error = "Oops! Something went wrong, While update OTP";
      }
    } else {
      response.status == 400;
      response.message = "Sorry, your email is not registered";
      response.errors.email = "Sorry, your email is not registered";
    }

   

    return response;
  } catch (error) {
    console.log(
      `Something went wrong service : userService : findAccountAndSendOTP\nError: ${error.message}`
    );
    throw new Error(error.message);
  }
};

// loginUser
module.exports.loginUser = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const userResponse = await userModel.findOne({
      email: serviceData.email,
    });

    if (userResponse) {
      // disabled account
      if (userResponse.status === false) {
        response.errors = {
          email: "Your account has been disabled",
        };
        response.message = "Your account has been disabled";
        return response;
      }

      // for deleted account
      if (userResponse.isDeleted === true) {
        response.errors = {
          email: "Your account has been deleted",
        };
        response.message = "Your account has been deleted";
        return response;
      }

      // if account is not verified
      if (userResponse.isVerified == false) {
        // generate otp
        const currentDate = new Date();
        const otp = optGenerator.createOTP();
        const otpExpires = currentDate.setMinutes(currentDate.getMinutes() + 3);

        const updateResponse = await userModel.findOneAndUpdate(
          { _id: userResponse._id },
          {
            otp: otp,
            otpExpiredAt: otpExpires,
          },
          { new: true }
        );

        if (updateResponse) {
          // send otp
          const smsResponse = await smsHelper.sendOTPEmail({
            emailTo: userResponse.email,
            subject: "OTP Verification",
            name: userResponse.name,
            otp,
          });

          if (smsResponse.status == true) {
            response.body = formatMongoData(userResponse);
            response.message = "An OTP has been sent on your Email";
            response.status = 301;
          } else {
            response.message = smsResponse.message;
            response.errors.error = smsResponse.message;
          }

          return response;
        } else {
          response.errors = {
            error: "Something went wrong while login your account",
          };
          response.message = "Something went wrong while login your account";
          return response;
        }
      }

      // Check password is matched or not
      const isCorrect = await bcryptjs.compare(
        serviceData.password,
        userResponse.password
      );
      if (isCorrect) {
        // Sign jwt token
        const token = jwt.sign(
          { id: userResponse._id },
          process.env.JWT_USER_SECRET_KEY
        );
        const formatData = userResponse.toObject();
        response.status = 200;
        response.message = "You have successfully logged in";
        response.body = { ...formatData, token };
      } else {
        response.errors.password = constants.authMessage.INVALID_PASSWORD;
        response.message = "Validation failed";
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
  const response = _.cloneDeep(constants.defaultServerResponse);
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
  const response = _.cloneDeep(constants.defaultServerResponse);
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
  const response = _.cloneDeep(constants.defaultServerResponse);
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
    response.status = 200;
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
    const response = _.cloneDeep(constants.defaultServerResponse);

    const isUserExist = await userModel.findOne({
      _id: serviceData.id,
      isDeleted: true,
    });
    if (isUserExist) {
      response.errors = {
        name: constants.userMessage.USER_NOT_EXISTS,
      };
      return response;
    }

    const dbResponse = await userModel.findOneAndUpdate(
      { _id: serviceData.id }, // Condition to find the document
      { isDeleted: true }, // Update to set isDeleted field to true
      { new: true } // Options to return the updated document
    );

    if (!dbResponse) {
      response.errors = {
        error: constants.userMessage.USER_NOT_DELETED,
      };
      response.message = constants.userMessage.USER_NOT_DELETED;
      return response;
    }

    response.body = formatMongoData(dbResponse);
    response.status = 200;

    return response;
  } catch (error) {
    console.log(`Something went wrong: service : userService : deleteUser`);
    throw new Error(error);
  }
};

// getUserById
module.exports.getUserById = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const dbResponse = await userModel.findOne({
      _id: serviceData.id,
      isDeleted: false,
    });

    if (!dbResponse) {
      response.errors = {
        error: constants.userMessage.USER_NOT_FOUND,
      };
      response.message = constants.userMessage.USER_NOT_FOUND;
      return response;
    }

    response.body = formatMongoData(dbResponse);
    response.status = 200;
    return response;
  } catch (error) {
    console.log(`Something went wrong: service : userService : deleteUser`);
    throw new Error(error);
  }
};

// UpdateUser

module.exports.updateUser = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const { id, body } = serviceData;
    const dbResponse = await userModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!dbResponse) {
      response.errors = {
        error: constants.userMessage.USER_NOT_UPDATED,
      };
      response.message = constants.userMessage.USER_NOT_UPDATED;
      return response;
    }

    response.body = formatMongoData(dbResponse);
    response.status = 200;
    return response;
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: updateService: updateUser`,
      error.message
    );
    throw new Error(error);
  }
};
