const bcrypt = require("bcrypt");
const constants = require("../helpers/constants");
const { formatMongoData } = require("../helpers/dbHelper");
const levelModel = require("../database/models/levelModel");

// createLevel
module.exports.createLevel = async (serviceData) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const levelResponse = await levelModel.findOne({
      name: serviceData.name,
    });

    if (levelResponse) {
      response.errors = {
        email: "Level already exists",
        status: 400,
      };
      return response;
    }

    const newData = new levelModel(serviceData);
    const serviceResponse = await newData.save();

    return formatMongoData(serviceResponse);
  } catch (error) {
    console.log(
      `Something went wrong service: levelService: createLevel\nError: ${error.message}`
    );
    throw new Error(error.message);
  }
};

// getAllLevels
module.exports.getAllLevels = async (serviceData) => {
  // console.log(serviceData);
  
  try {
    const { limit = 10, skip = 0, status = true } = serviceData;
    let conditions = {};
    // Set the condition for active levels (where isDeleted is false)
    conditions.isDeleted = false;

    // status condition
    if (status == true || status == false) {
      conditions.status = status;
    }

    const dbResponse = await levelModel
      .find(conditions)
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    const formatData = formatMongoData(dbResponse);
    return formatData;
  } catch (error) {
    console.log(
      `Something went wrong: Service: levelService: getAllLevels\nError: ${error.message}`
    );
    throw new Error(error);
  }
};

// deleteLevel
module.exports.deleteLevel = async (serviceData) => {
  console.log(serviceData);
  
  try {
    const response = { ...constants.defaultServerResponse };

    const dbResponse = await levelModel.findOneAndUpdate(
      { _id: serviceData.id }, // Condition to find the document
      { isDeleted: true }, // Update to set isDeleted field to true
      { new: true } // Options to return the updated document
    );

    console.log(dbResponse)
    if (!dbResponse) {
      response.errors = {
        error: constants.LevelMessage.LEVEL_NOT_DELETED,
      };
      return response;
    }

    response.body = dbResponse;
    response.status = 200;

    return response;
  } catch (error) {
    console.log(
      `Something went wrong: service: levelService: deleteLevel\nError: ${error.message}`
    );
    throw new Error(error);
  }
};

// getLevelById
module.exports.getLevelById = async (serviceData) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const dbResponse = await levelModel.findById(serviceData.id);
    const formatData = formatMongoData(dbResponse);
    return formatData;
  } catch (error) {
    console.log(
      `Something went wrong: service: levelService: getLevelById\nError: ${error.message}`
    );
    throw new Error(error);
  }
};

// updateLevel
module.exports.updateLevel = async (serviceData) => {
  try {
    const { id, body } = serviceData;
    const dbResponse = await levelModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return formatMongoData(dbResponse);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: levelService: updateLevel`,
      error.message
    );
    throw new Error(error);
  }
};
