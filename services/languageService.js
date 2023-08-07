const constants = require("../helpers/constants");
const { formatMongoData } = require("../helpers/dbHelper");
const languageModel = require("../database/models/languageModel");
const _ = require("lodash");

// createLanguage
module.exports.createLanguage = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const languageResponse = await languageModel.findOne({
      name: serviceData.name,
    });

    if (languageResponse) {
      response.errors = {
        name: constants.languageMessage.LANGUAGE_ALREADY_EXISTS,
      };
      response.message = constants.languageMessage.LANGUAGE_ALREADY_EXISTS;
      return response;
    }
    const newData = new languageModel(serviceData);
    const dbResponse = await newData.save();

    if (dbResponse) {
      response.body = formatMongoData(dbResponse);
      response.status = 200;
    } else {
      response.errors = {
        error: constants.languageMessage.LANGUAGE_NOT_CREATED,
      };
      response.message = constants.languageMessage.LANGUAGE_NOT_CREATED;
    }
    return response;
  } catch (error) {
    console.log(
      `Something went wrong service : languageService : createLanguage\nError: ${error.message}`
    );
    throw new Error(error.message);
  }
};

// getAllLanguages
module.exports.getAllLanguages = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const { limit = 10, page = 1, status = "true", searchQuery } = serviceData;
    let conditions = {};
    // Set the condition for active language (where isDeleted is false)
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
    const totalRecords = await languageModel.countDocuments(conditions);
    const totalPages = Math.ceil(totalRecords / parseInt(limit));

    const dbResponse = await languageModel
      .find(conditions)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    if (!dbResponse) {
      response.errors = {
        error: constants.languageMessage.LANGUAGE_NOT_FOUND,
      };
      response.message = constants.languageMessage.LANGUAGE_NOT_FOUND;
      return response;
    }
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
      `Something went wrong: Service: languageService: getAllLanguages\nError: ${error.message}`
    );
    throw new Error(error);
  }
};

// deleteLanguage
module.exports.deleteLanguage = async (serviceData) => {
  try {
    const response = _.cloneDeep(constants.defaultServerResponse);
    const isLanguageExist = await languageModel.findOne({
      _id: serviceData.id,
      isDeleted: true,
    });
    if (isLanguageExist) {
      response.errors = {
        name: constants.languageMessage.LANGUAGE_NOT_EXISTS,
      };
      return response;
    }

    const dbResponse = await languageModel.findOneAndUpdate(
      { _id: serviceData.id }, // Condition to find the document
      { isDeleted: true }, // Update to set isDeleted field to true
      { new: true } // Options to return the updated document
    );

    if (!dbResponse) {
      response.errors = {
        error: constants.languageMessage.LANGUAGE_NOT_DELETED,
      };
      response.message = constants.languageMessage.LANGUAGE_NOT_DELETED;
      return response;
    }

    response.body = formatMongoData(dbResponse);
    response.status = 200;
    return response;
  } catch (error) {
    console.log(
      `Something went wrong: service : languageService : deleteLanguage`
    );
    throw new Error(error);
  }
};

// getLanguageById
module.exports.getLanguageById = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const dbResponse = await languageModel.findOne({
      _id: serviceData.id,
      isDeleted: false,
    });

    if (!dbResponse) {
      response.errors = {
        error: constants.languageMessage.LANGUAGE_NOT_FOUND,
      };
      response.message = constants.languageMessage.LANGUAGE_NOT_FOUND;
      return response;
    }
    response.body = formatMongoData(dbResponse);
    response.status = 200;
    return response;
  } catch (error) {
    console.log(
      `Something went wrong: service : languageService : getLanguageById`
    );
    throw new Error(error);
  }
};

// updateLanguage
module.exports.updateLanguage = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const { id, body } = serviceData;
    const dbResponse = await languageModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!dbResponse) {
      response.errors = {
        error: constants.languageMessage.LANGUAGE_NOT_UPDATED,
      };
      response.message = constants.languageMessage.LANGUAGE_NOT_UPDATED;
      return response;
    }
    response.body = formatMongoData(dbResponse);
    response.status = 200;
    return response;
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: languageService: updateLanguage`,
      error.message
    );
    throw new Error(error);
  }
};
