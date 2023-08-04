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
        name: constants.levelMessage.LEVEL_ALREADY_EXISTS,
      };
      response.message = constants.levelMessage.LEVEL_ALREADY_EXISTS;
      return response;
    }

    const newData = new levelModel(serviceData);
    const dbResponse = await newData.save();

    if (dbResponse) {
      response.body = formatMongoData(dbResponse);
      response.status = 200;
    } else {
      response.errors = {
        error: constants.levelMessage.LEVEL_NOT_CREATED,
      };
      response.message = constants.levelMessage.LEVEL_NOT_CREATED;
    }

    return response;
  } catch (error) {
    console.log(
      `Something went wrong service: levelService: createLevel\nError: ${error.message}`
    );
    throw new Error(error.message);
  }
};

// getAllLevels
module.exports.getAllLevels = async (serviceData) => {
  try {
    const response = { ...constants.defaultServerResponse };
    const { limit = 10, page = 1, status = "true", searchQuery } = serviceData;
    let conditions = {};
    // Set the condition for active levels (where isDeleted is false)
    conditions.isDeleted = false;

    // status condition
    if (status == "true" || status == "false") {
      conditions.status = status;
    }

    // search query
    if (searchQuery) {
      const regex = new RegExp(searchQuery, "i");
      conditions.$or = [
        { name: regex },
        { description: regex },
        { slug: regex },
      ];
    }

    // count document
    const totalRecords = await levelModel.countDocuments(conditions);
    const totalPages = Math.ceil(totalRecords / parseInt(limit));

    const dbResponse = await levelModel
      .find(conditions)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    if (!dbResponse) {
      response.errors = {
        error: constants.levelMessage.LEVEL_NOT_FOUND,
      };
      response.message = constants.levelMessage.LEVEL_NOT_FOUND;
      return response;
    }
    response.status = 200;
    const formatData = formatMongoData(dbResponse);
    return {
      body: formatData,
      totalPages,
      totalRecords,
      page,
    };
  } catch (error) {
    console.log(
      `Something went wrong: Service: levelService: getAllLevels\nError: ${error.message}`
    );
    throw new Error(error);
  }
};

// deleteLevel
module.exports.deleteLevel = async (serviceData) => {
  try {
    const response = { ...constants.defaultServerResponse };

    const isLevelExist = await levelModel.findOne({
      _id: serviceData.id,
      isDeleted: true,
    });
    if (isLevelExist) {
      response.errors = {
        name: constants.levelMessage.LEVEL_NOT_EXISTS,
      };
      return response;
    }

    const dbResponse = await levelModel.findOneAndUpdate(
      { _id: serviceData.id }, // Condition to find the document
      { isDeleted: true }, // Update to set isDeleted field to true
      { new: true } // Options to return the updated document
    );

    if (!dbResponse) {
      response.errors = {
        error: constants.levelMessage.LEVEL_NOT_DELETED,
      };
      response.message = constants.levelMessage.LEVEL_NOT_DELETED;
      return response;
    }

    response.body = formatMongoData(dbResponse);
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
    const dbResponse = await levelModel.findOne({
      _id: serviceData.id,
      isDeleted: false,
    });
    if (!dbResponse) {
      response.errors = {
        error: constants.levelMessage.LEVEL_NOT_FOUND,
      };
      response.message = constants.levelMessage.LEVEL_NOT_FOUND;
      return response;
    }
    response.body = formatMongoData(dbResponse);
    response.status = 200;
    return response;
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
    const response = { ...constants.defaultServerResponse };
    const { id, body } = serviceData;
    const dbResponse = await levelModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!dbResponse) {
      response.errors = {
        error: constants.levelMessage.LEVEL_NOT_UPDATED,
      };
      response.message = constants.levelMessage.LEVEL_NOT_UPDATED;
      return response;
    }
    response.body = formatMongoData(dbResponse);
    response.status = 200;
    return response;
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: levelService: updateLevel`,
      error.message
    );
    throw new Error(error);
  }
};
