const constants = require("../helpers/constants");
const lessonService = require("../services/lessonService");
const _ = require("lodash");

// createlesson
module.exports.createLesson = async (req, res) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const serviceResponse = await lessonService.createLesson(req.body);

    if (serviceResponse.status === 400) {
      response.errors = serviceResponse.errors;
      response.message = serviceResponse.message;
    } else {
      response.body = serviceResponse.body;
      response.message = constants.lessonMessage.LESSON_CREATED;
      response.status = 200;
    }
  } catch (error) {
    console.log(`Something went wrong:controller:lessonController: createlesson
    Error:${error.message}`);
    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// getlessonByID

module.exports.getLessonById = async (req, res) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const serviceResponse = await lessonService.getLessonById(req.params);

    if (serviceResponse.status === 400) {
      response.errors = serviceResponse.errors;
      response.message = serviceResponse.message;
    } else {
      response.body = serviceResponse;
      response.message = constants.lessonMessage.LESSON_FETCHED;
      response.status = 200;
    }
  } catch (error) {
    console.log(`Something went wrong:controller:lessonController: getLessonById
    Error:${error.message}`);
    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// getAllLessons

module.exports.getAllLessons = async (req, res) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const serviceResponse = await lessonService.getAllLessons(req.query);
    if (serviceResponse === 400) {
      response.message = serviceResponse.message;
      response.errors = serviceResponse.errors;
    } else {
      response.body = serviceResponse.body;
      response.totalPages = serviceResponse.totalPages;
      response.totalRecords = serviceResponse.totalRecords;
      response.page = serviceResponse.page;
      response.status = 200;
      response.message = constants.lessonMessage.LESSON_FETCHED;
    }
  } catch (error) {
    console.log(`Something went wrong:controller:lessonController: getAllLessons
    Error:${error.message}`);

    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// deletelesson
module.exports.deleteLesson = async (req, res) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const serviceResponse = await lessonService.deleteLesson(req.params);
    if (serviceResponse.status == 400) {
      response.message = serviceResponse.message;
      response.errors = serviceResponse.errors;
    } else {
      response.body = serviceResponse.body;
      response.message = constants.lessonMessage.LESSON_DELETED;
      response.status = 200;
    }
  } catch (error) {
    console.log(`Something went wrong:controller:lessonController: deleteLesson
      Error:${error.message}`);

    response.message = error.message;
    response.errors = {
      error: error.message,
    };
  }
  res.status(response.status).send(response);
};

// updatelesson
module.exports.updateLesson = async (req, res) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const serviceResponse = await lessonService.updateLesson({
      id: req.params.id,
      body: req.body,
    });

    if (serviceResponse.status== 400) {
      response.errors = serviceResponse.errors;
      response.message = serviceResponse.message;
      // console.log(response.status)
    } else {
      response.body = serviceResponse.body;
      response.status = 200;
      response.message = constants.lessonMessage.LESSON_UPDATED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: lessonController: updateLesson`,
      error.message
    );
    response.errors = error;
    response.message = error.message;
  }
  res.status(response.status).send(response);
};
