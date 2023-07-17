const constants = require("../helpers/constants");
const { formatMongoData } = require("../helpers/dbHelper");
const languageModel = require("../database/models/languageModel");

// createLanguage
module.exports.createLanguage = async (serviceData) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const dbResponse = await languageModel.findOne({
      name: serviceData.name,
    });

    if (dbResponse) {
      response.errors = {
        email: "Language already exists",
        status: 400,
      };
      return response;
    }
    const newData = new languageModel(serviceData);

    const serviceResponse = await newData.save();
    return formatMongoData(serviceResponse);
  } catch (error) {
    console.log(
      `Something went wrong service : userService : createLanguage\nError: ${error.message}`
    );
    throw new Error(error.message);
  }
};

// getAllLanguages
module.exports.getAllLanguages = async (serviceData) => {
  try {
    const { limit = 10, skip = 0, status = true } = serviceData;
    let conditions = {};
    // Set the condition for active users (where isDeleted is false)
    conditions.isDeleted = false;

    // status condition
    if (status == true || status == false) {
      conditions.status = status;
    }

    const dbResponse = await languageModel
      .find(conditions)
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    const formatData = formatMongoData(dbResponse);
    // console.log(formatData)
    return formatData;
  } catch (error) {
    console.log(
      `Something went wrong: Service: LanguageService: getAllLanguages\nError: ${error.message}`
    );
    throw new Error(error);
  }
};

// deleteLanguage
module.exports.deleteLanguage = async (serviceData) => {
  try {
    const response = { ...constants.defaultServerResponse };

    const dbResponse = await languageModel.findOneAndUpdate(
      { _id: serviceData.id }, // Condition to find the document
      { isDeleted: true }, // Update to set isDeleted field to true
      { new: true } // Options to return the updated document
    );
    console.log(dbResponse);

    if (!dbResponse) {
      response.errors = {
        error: constants.LanguageMessage.LANGUAGE_NOT_DELETED
      };
      return response;
    }

    response.body = dbResponse;
    response.status = 200;

    return response;
  } catch (error) {
    console.log(
      `Something went wrong: service : LanguageService : deleteLanguage`
    );
    throw new Error(error);
  }
};

// getLanguageById
module.exports.getLanguageById = async (serviceData) => {
  const response = { ...constants.defaultServerResponse };
  console.log(serviceData.id)
  try {
    const dbResponse = await languageModel.findById(serviceData.id);
    const formatData = formatMongoData(dbResponse);
    return formatData;
  } catch (error) {
    console.log(`Something went wrong: service : LaaguageService : deleteLanguage`);
    throw new Error(error);
  }
};

// updateLanguage

module.exports.updateLanguage = async (serviceData) => {

  try {
    const { id, body } = serviceData;
    const dbResponse = await languageModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    console.log(dbResponse);
    return formatMongoData(dbResponse);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: LanguageService: updateLanguage`,
      error.message
    );
    throw new Error(error);
  }
};
