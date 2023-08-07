const lessonModel = require("../database/models/lessonModel");
const constants = require("../helpers/constants");

const lessonContentService = require("../services/lessonContentService");
const _ = require("lodash");

// createContent
module.exports.createLessonContent = async (req, res) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const serviceResponse = await lessonContentService.createLessonContent(
      req.params.lessonId,
      req.body
    );

    if (serviceResponse.status === 400) {
      response.errors = serviceResponse.errors;
      response.message = constants.contentMessage.CONTENT_NOT_CREATED;
    } else {
      response.body = serviceResponse.body;
      response.message = constants.contentMessage.CONTENT_CREATED;
      response.status = 200;
    }
  } catch (error) {
    console.log(`Something went wrong:controller:lessonContentController: createLessonContent 
    Error:${error.message}`);
    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// getLessonContent ByID

module.exports.getLessonContentById = async (req, res) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const serviceResponse = await lessonContentService.getLessonContentById(
      req.params
    );

    if (serviceResponse.status === 200) {
      response.body = serviceResponse.body;
      response.status = 200;
      response.message = constants.contentMessage.CONTENT_FETCHED;
    } else {
      response.errors = serviceResponse.errors;
      response.message = serviceResponse.message;
    }
  } catch (error) {
    console.log(`Something went wrong:controller:lessonContent Controller: getLessonContentById
    Error:${error.message}`);
    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// updateContent
module.exports.updateLessonContent = async (req, res) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const serviceResponse = await lessonContentService.updateLessonContent({
      id: req.params.contentId,
      body: req.body,
    });

    if (serviceResponse == 400) {
      response.message = serviceResponse.message;
      response.errors = serviceResponse.errors;
    } else {
      response.body = serviceResponse.body;
      response.status = 200;
      response.message = constants.contentMessage.CONTENT_UPDATED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: lessonContentController: updateLessonContent `,
      error.message
    );

    response.errors = error;
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// deleteLessonContent
module.exports.deleteLessonContent = async (req, res) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const serviceResponse = await lessonContentService.deleteLessonContent(
      req.params
    );

    if (serviceResponse.status == 400) {
      response.message = serviceResponse.message;
      response.errors = serviceResponse.errors;
    } else {
      response.body = serviceResponse.body;
      response.message = constants.contentMessage.CONTENT_DELETED;
      response.status = 200;
    }
  } catch (error) {
    console.log(
      `Something went wrong in Controller : lessonContent : deleteLessonContent\nError:${error.message}`
    );
    response.message = error.message;
    response.errors = {
      error: error.message,
    };
  }
  res.status(response.status).send(response);
};
