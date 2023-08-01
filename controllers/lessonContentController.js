const lessonModel = require("../database/models/lessonModel");
const constants = require("../helpers/constants");
const lessonContentService = require("../services/lessonContentService");

// createContent
module.exports.createLessonContent = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await lessonContentService.createLessonContent(
      req.params.lessonId,
      req.body
    );

    if (serviceResponse.status === 400) {
      response.errors = serviceResponse.errors;
      response.message = constants.contentMessage.CONTENT_NOT_CREATED;
    } else {
      response.body = serviceResponse;
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

// // getContent ByID

// module.exports.getContentById = async (req, res) => {
//   const response = { ...constants.defaultServerResponse };
//   try {
//     const serviceResponse = await lessonContentService.getContentById(req.params);
//     response.body = serviceResponse;
//     response.status = 200;
//     response.message = constants.contentMessage.CONTENT_FETCHED;
//   } catch (error) {
//     console.log(`Something went wrong:controller:Content Controller: getContentById
//     Error:${error.message}`);
//     response.message = error.message;
//     response.errors = error;
//   }
//   res.status(response.status).send(response);
// };

//getAllLessonsContents

// module.exports.getAllLessonsContents = async (req, res) => {
//   const response = { ...constants.defaultServerResponse };
//   try {
//     const serviceResponse = await lessonContentService.getAllLessonsContents(req.query);
//     response.body = serviceResponse.body;
//     response.totalPages = serviceResponse.totalPages;
//     response.totalRecords = serviceResponse.totalRecords;
//     response.page = serviceResponse.page;
//     response.status = 200;
//     response.message = constants.contentMessage.CONTENT_FETCHED;
//   } catch (error) {
//     console.log(`Something went wrong:controller:contentController: getAllLessonsContents
//     Error:${error.message}`);

//     response.message = error.message;
//     response.errors = error;
//   }
//   res.status(response.status).send(response);
// };

// // deleteContent
// module.exports.deleteContent = async (req, res) => {
//   const response = { ...constants.defaultServerResponse };
//   try {
//     const serviceResponse = await lessonContentService.deleteContent(req.params);
//     if (serviceResponse.status == 200) {
//       response.body = serviceResponse.body;
//       response.message = constants.contentMessage.CONTENT_DELETED;
//       response.status = 200;
//     } else {
//       response.message = constants.contentMessage.CONTENT_DELETED;
//       response.status = 400;
//       response.errors = serviceResponse.errors;
//     }
//   } catch (error) {
//     console.log(`Something went wrong:controller:contentController:deleteContent
//       Error:${error.message}`);

//     response.message = error.message;
//     response.errors = {
//       error: error.message,
//     };
//   }
//   res.status(response.status).send(response);
// };

// updateContent
module.exports.updateLessonContent = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await lessonContentService.updateLessonContent({
      id: req.params.contentId,
      body: req.body,
    });

    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = constants.contentMessage.CONTENT_UPDATED;
    } else {
      response.message = constants.contentMessage.CONTENT_NOT_UPDATED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: lessonContentController: updateLessonContent `,
      error.message
    );

    response.errors = error;
    response.message = error.message;
    throw new Error(error);
  }
  res.status(response.status).send(response);
};

// deleteLessonContent
module.exports.deleteLessonContent = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await lessonContentService.deleteLessonContent(req.params);

    if (serviceResponse.status == 200) {
      response.body = serviceResponse.body;
      response.message = constants.contentMessage.CONTENT_DELETED;
      response.status = 200;
    } else {
      response.message = constants.contentMessage.CONTENT_NOT_DELETED;
      response.status = 400;
      response.errors = serviceResponse.errors;
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
