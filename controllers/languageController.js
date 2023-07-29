const LanguageService = require("../services/languageService");
const constants = require("../helpers/constants");

// createLanguage
module.exports.createLanguage = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await LanguageService.createLanguage(req.body);

    if (serviceResponse.status === 400) {
      response.errors = serviceResponse.errors;
      response.status = 400; // Set the response status to 400
    } else {
      response.body = serviceResponse;
      response.message = constants.languageMessage.LANGUAGE_CREATED;
      response.status = 200;
    }
  } catch (error) {
    console.log(
      `Something went wrong controller : LanguageController :createLanguage \nError: ${error.message}`
    );

    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// getAllLanguages
module.exports.getAllLanguages = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await LanguageService.getAllLanguages(req.query);
    response.body = serviceResponse.body;
    response.totalPages = serviceResponse.totalPages;
    response.totalRecords = serviceResponse.totalRecords;
    response.page = serviceResponse.page;
    response.status = 200;
    response.message = constants.languageMessage.LANGUAGEL_FETCHED;
  } catch (error) {
    console.log(`Something went wrong:controller:LanguageController: getAllCategories
    Error:${error.message}`);

    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// deleteLanguage
module.exports.deleteLanguage = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await LanguageService.deleteLanguage(req.params);
    if (serviceResponse.status == 200) {
      response.body = serviceResponse.body;
      response.message = constants.languageMessage.LANGUAGE_DELETED;
      response.status = 200;
    } else {
      response.message = constants.languageMessage.LANGUAGE_DELETED;
      response.status = 400;
      response.errors = serviceResponse.errors;
    }
  } catch (error) {
    console.log(`Something went wrong:controller:LanguageController: getAllCategories
      Error:${error.message}`);

    response.message = error.message;
    response.errors = {
      error: error.message,
    };
  }
  res.status(response.status).send(response);
};

// getLanguageById
module.exports.getLanguageById = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await LanguageService.getLanguageById(req.params);
    response.body = serviceResponse;
    response.status = 200;
    response.message = constants.languageMessage.LANGUAGEL_FETCHED;
  } catch (error) {
    console.log(`Something went wrong:controller:LanguageController: getLanguageById
    Error:${error.message}`);
    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// updateLanguage
module.exports.updateLanguage = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await LanguageService.updateLanguage({
      id: req.params.id,
      body: req.body,
    });

    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = constants.languageMessage.LANGUAGE_UPDATED;
    } else {
      response.message = constants.languageMessage.LANGUAGE_NOT_UPDATED;
    }
  } catch (error) {
    console.log(
      `Something went wrong: Controller : LanguageController : updateLanguage ${error.message}`
    );

    response.errors = error;
    response.message = error.message;
  }
  res.status(response.status).send(response);
};
