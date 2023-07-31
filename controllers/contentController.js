// const constants = require("../helpers/constants");
// const contentService = require("../services/contentService");

// // createContent
// module.exports.createContent = async (req, res) => {
//   const response = { ...constants.defaultServerResponse };
//   try {
//     const serviceResponse = await contentService.createContent(req.body);

//     if (serviceResponse.status === 400) {
//       response.errors = serviceResponse.errors;
//       response.message = constants.contentMessage.CONTENT_NOT_CREATED;
//     } else {
//       response.body = serviceResponse;
//       response.message = constants.contentMessage.CONTENT_CREATED;
//       response.status = 200;
//     }
//   } catch (error) {
//     console.log(`Something went wrong:controller:Content Controller: createContent 
//     Error:${error.message}`);
//     response.message = error.message;
//     response.errors = error;
//   }
//   res.status(response.status).send(response);
// };

// // getContent ByID

// module.exports.getContentById = async (req, res) => {
//   const response = { ...constants.defaultServerResponse };
//   try {
//     const serviceResponse = await contentService.getContentById(req.params);
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

// // getAllContents

// module.exports.getAllContents = async (req, res) => {
//   const response = { ...constants.defaultServerResponse };
//   try {
//     const serviceResponse = await contentService.getAllContents(req.query);
//     response.body = serviceResponse.body;
//     response.totalPages = serviceResponse.totalPages;
//     response.totalRecords = serviceResponse.totalRecords;
//     response.page = serviceResponse.page;
//     response.status = 200;
//     response.message = constants.contentMessage.CONTENT_FETCHED;
//   } catch (error) {
//     console.log(`Something went wrong:controller:contentController: getAllContent s
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
//     const serviceResponse = await contentService.deleteContent(req.params);
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

// // updateContent
// module.exports.updateContent = async (req, res) => {
//   const response = { ...constants.defaultServerResponse };
//   try {
//     const serviceResponse = await contentService.updateContent({
//       id: req.params.id,
//       body: req.body,
//     });

//     if (serviceResponse) {
//       response.body = serviceResponse;
//       response.status = 200;
//       response.message = constants.contentMessage.CONTENT_UPDATED;
//     } else {
//       response.message = constants.contentMessage.CONTENT_NOT_UPDATED;
//     }
//   } catch (error) {
//     console.log(
//       `Somthing Went Wrong Controller: Content Controller: updateContent `,
//       error.message
//     );

//     response.errors = error;
//     response.message = error.message;
//     throw new Error(error);
//   }
//   res.status(response.status).send(response);
// };
