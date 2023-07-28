const constants = require("../helpers/constants");
const levelService = require("../services/levelService");

// createLevel
module.exports.createLevel = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await levelService.createLevel(req.body);

    if (serviceResponse.status === 400) {
      response.errors = serviceResponse.errors;
      response.status = 400; // Set the response status to 400
    } else {
      response.body = serviceResponse;
      response.message = constants.LevelMessage.LEVEL_CREATED;
      response.status = 200;
    }
  } catch (error) {
    console.log(
      `Something went wrong in service: levelService: createLevel\nError: ${error.message}`
    );

    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// getAllLevels
module.exports.getAllLevels = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await levelService.getAllLevels(req.query);

    response.body = serviceResponse.body;
    response.totalPages = serviceResponse.totalPages;
    response.totalRecords = serviceResponse.totalRecords;
    response.page = serviceResponse.page;
    response.status = 200;
    response.message = constants.LevelMessage.LEVEL_FETCHED;
  } catch (error) {
    console.log(
      `Something went wrong in service: levelService: getAllLevels\nError:${error.message}`
    );

    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// deleteLevel
module.exports.deleteLevel = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  console.log(req.params);

  try {
    const serviceResponse = await levelService.deleteLevel(req.params);

    if (serviceResponse.status == 200) {
      response.body = serviceResponse.body;
      response.message = constants.LevelMessage.LEVEL_DELETED;
      response.status = 200;
    } else {
      response.message = constants.LevelMessage.LEVEL_NOT_DELETED;
      response.status = 400;
      response.errors = serviceResponse.errors;
    }
  } catch (error) {
    console.log(
      `Something went wrong in service: levelService: deleteLevel\nError:${error.message}`
    );

    response.message = error.message;
    response.errors = {
      error: error.message,
    };
  }
  res.status(response.status).send(response);
};

// getLevelById
module.exports.getLevelById = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await levelService.getLevelById(req.params);

    response.body = serviceResponse;
    response.status = 200;
    response.message = constants.LevelMessage.LEVEL_FETCHED;
  } catch (error) {
    console.log(
      `Something went wrong in service: levelService: getLevelById\nError:${error.message}`
    );
    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// updateLevel
module.exports.updateLevel = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await levelService.updateLevel({
      id: req.params.id,
      body: req.body,
    });
    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = constants.LevelMessage.LEVEL_UPDATED;
    } else {
      response.message = constants.LevelMessage.LEVEL_NOT_UPDATED;
    }
  } catch (error) {
    console.log(
      `Something went wrong in service: levelService: updateLevel\nError: ${error.message}`
    );

    response.errors = error;
    response.message = error.message;
  }
  res.status(response.status).send(response);
};
