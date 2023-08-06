const constants = require("../helpers/constants");
const purchasedCourseHistoryService = require("../services/purchasedCourseHistoryService");
const _ = require("lodash");

module.exports.getAllPurchasedCoursesHistory = async (req, res) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const serviceResponse = await purchasedCourseHistoryService.getAllPurchasedCoursesHistory(
      req.query
    );

    if (serviceResponse.status === 400) {
      response.message = serviceResponse.message;
      response.errors = serviceResponse.errors;
    } else {
      response.body = serviceResponse.body;
      response.totalPages = serviceResponse.totalPages;
      response.totalRecords = serviceResponse.totalRecords;
      response.page = serviceResponse.page;
      response.status = 200;
      response.message =
        constants.purchasedCourseMessage.PURCHASED_COURSE_FETCHED;
    }
  } catch (error) {
    console.log(`Something went wrong:controller:purchasedCourseController: getAllPurchasedCoursesHistory
    Error:${error.message}`);

    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};


module.exports.getPurchasedCourseHistoryByID = async (req, res) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const serviceResponse = await purchasedCourseHistoryService.getPurchasedCourseHistoryById(
      req.params
    );

    if (serviceResponse.status === 400) {
      response.errors = serviceResponse.errors;
      response.message = serviceResponse.message;
    } else {
      response.body = serviceResponse.body;
      response.status = 200;
      response.message =
        constants.purchasedCourseHistoryMessage.PURCHASED_COURSE_HISTORY_FETCHED
    }
  } catch (error) {
    console.log(`Something went wrong:controller:purchasedCourseHistoryController: getPurchasedCourseHistoryByID
    Error:${error.message}`);
    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};