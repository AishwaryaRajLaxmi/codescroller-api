const LanguageService = require("../services/languageService");
const constants = require("../helpers/constants");
const _ = require("lodash");

// createLanguage
module.exports.createLanguage = async (req, res) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const serviceResponse = await LanguageService.createLanguage(req.body);

    if (serviceResponse.status === 400) {
      response.errors = serviceResponse.errors;
      response.message = serviceResponse.message;
    } else {
      response.body = serviceResponse.body;
      response.message = constants.languageMessage.LANGUAGE_CREATED;
      response.status = 200;
    }
  } catch (error) {
    console.log(
      `Something went wrong controller :  languageController :createLanguage Error: ${error.message}`
    );

    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// getAllLanguages
module.exports.getAllLanguages = async (req, res) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const serviceResponse = await LanguageService.getAllLanguages(req.query);

    if (serviceResponse.status == 400) {
      response.errors = serviceResponse.errors;
      response.message = serviceResponse.message;
    } else {
      response.body = serviceResponse.body;
      response.totalPages = serviceResponse.totalPages;
      response.totalRecords = serviceResponse.totalRecords;
      response.page = serviceResponse.page;
      response.status = 200;
      response.message = constants.languageMessage.LANGUAGEL_FETCHED;
    }
  } catch (error) {
    console.log(`Something went wrong:controller: languageController: getAllLanguages
    Error:${error.message}`);

    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// deleteLanguage
module.exports.deleteLanguage = async (req, res) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const serviceResponse = await LanguageService.deleteLanguage(req.params);

    if (serviceResponse.status == 400) {
      response.message = serviceResponse.message;
      response.errors = serviceResponse.errors;
    } else {
      response.body = serviceResponse.body;
      response.message = constants.languageMessage.LANGUAGE_DELETED;
      response.status = 200;
    }
  } catch (error) {
    console.log(`Something went wrong:controller: languageController: deleteLanguage
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
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const serviceResponse = await LanguageService.getLanguageById(req.params);

    if (serviceResponse.status === 400) {
      response.message = serviceResponse.message;
      response.errors = serviceResponse.errors;
    } else {
      response.body = serviceResponse.body;
      response.status = 200;
      response.message = constants.languageMessage.LANGUAGEL_FETCHED;
    }
  } catch (error) {
    console.log(`Something went wrong:controller: languageController: getLanguageById
    Error:${error.message}`);
    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// updateLanguage
module.exports.updateLanguage = async (req, res) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const serviceResponse = await LanguageService.updateLanguage({
      id: req.params.id,
      body: req.body,
    });

    if (serviceResponse.status === 400) {
      response.message = serviceResponse.message;
      response.errors = serviceResponse.errors;
    } else {
      response.body = serviceResponse.body;
      response.status = 200;
      response.message = constants.languageMessage.LANGUAGE_UPDATED;
    }
  } catch (error) {
    console.log(
      `Something went wrong: Controller :  languageController : updateLanguage ${error.message}`
    );

    response.errors = error;
    response.message = error.message;
  }
  res.status(response.status).send(response);
};
