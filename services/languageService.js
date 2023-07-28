const constants = require("../helpers/constants");
const { formatMongoData } = require("../helpers/dbHelper");
const languageModel = require("../database/models/languageModel");

// createLanguage
module.exports.createLanguage = async (serviceData) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const languageResponse = await languageModel.findOne({
      name: serviceData.name,
    });

    if (languageResponse) {
      response.errors = {
        name: "Language already exists",
        status: 400,
      };
      return response;
    }
    const newData = new languageModel(serviceData);

    const serviceResponse = await newData.save();
    return formatMongoData(serviceResponse);
  } catch (error) {
    console.log(
      `Something went wrong service : languageService : createLanguage\nError: ${error.message}`
    );
    throw new Error(error.message);
  }
};

// getAllLanguages
module.exports.getAllLanguages = async (serviceData) => {
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

    const languageResponse = await languageModel
      .find(conditions)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    const formatData = formatMongoData(languageResponse);
    // console.log(formatData)
    return {
      body: formatData,
      totalPages,
      totalRecords,
      page,
    };
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

    const languageResponse = await languageModel.findOneAndUpdate(
      { _id: serviceData.id }, // Condition to find the document
      { isDeleted: true }, // Update to set isDeleted field to true
      { new: true } // Options to return the updated document
    );
    console.log(languageResponse);

    if (!languageResponse) {
      response.errors = {
        error: constants.LanguageMessage.LANGUAGE_NOT_DELETED,
      };
      return response;
    }

    response.body = languageResponse;
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
  console.log(serviceData.id);
  try {
    const languageResponse = await languageModel.findOne({
      _id: serviceData.id,
      isDeleted: false,
    });
    const formatData = formatMongoData(languageResponse);
    return formatData;
  } catch (error) {
    console.log(
      `Something went wrong: service : LaaguageService : getLanguageById`
    );
    throw new Error(error);
  }
};

// updateLanguage

module.exports.updateLanguage = async (serviceData) => {
  try {
    const { id, body } = serviceData;
    const languageResponse = await languageModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    console.log(languageResponse);
    return formatMongoData(languageResponse);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: LanguageService: updateLanguage`,
      error.message
    );
    throw new Error(error);
  }
};
