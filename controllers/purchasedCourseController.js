const purchasedCourseModel = require("../database/models/purchasedCourseModel");
const constants = require("../helpers/constants");
const purchasedCourseService = require("../services/purchasedCourseService");

// createPurchasedCourse
module.exports.createPurchasedCourse = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await purchasedCourseService.createPurchasedCourse(
      req.params,
      req.body
    );

    if (serviceResponse.status === 400) {
      response.errors = serviceResponse.errors;
      response.message = serviceResponse.message;
    } else {
      response.body = serviceResponse.body;
      response.message = constants.courseMessage.COURSE_CREATED;
      response.status = 200;
    }
  } catch (error) {
    console.log(`Something went wrong:controller:courseController: createPurchasedCourse
    Error:${error.message}`);
    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// getPurchasedCourseByID

module.exports.getPurchasedCourseById = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await purchasedCourseService.getPurchasedCourseById(
      req.params
    );

    if (serviceResponse.status === 400) {
      response.errors = serviceResponse.errors;
      response.message = serviceResponse.message;
    } else {
      response.body = serviceResponse.body;
      response.status = 200;
      response.message =
        constants.purchasedCourseMessage.PURCHASED_COURSE_FETCHED;
    }
  } catch (error) {
    console.log(`Something went wrong:controller:purchasedCourseController: getPurchasedCourseById
    Error:${error.message}`);
    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// getAllCourses

module.exports.getAllPurchasedCourses = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await purchasedCourseService.getAllPurchasedCourses(
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
    console.log(`Something went wrong:controller:purchasedCourseController: getAllPurchasedCourses
    Error:${error.message}`);

    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// deleteCourse
module.exports.deletePurchasedCourse = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await purchasedCourseService.deletePurchasedCourse(
      req.params
    );
    if (serviceResponse.status == 400) {
      response.message = serviceResponse.message;
      response.errors = serviceResponse.errors;
    } else {
      response.body = serviceResponse.body;
      response.message = constants.courseMessage.COURSE_DELETED;
      response.status = 200;
    }
  } catch (error) {
    console.log(`Scomething went wrong:controller:courseController: getAllCourses
      Error:${error.message}`);

    response.message = error.message;
    response.errors = {
      error: error.message,
    };
  }
  res.status(response.status).send(response);
};

// updatePurchasedCourse
module.exports.updatePurchasedCourse = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await purchasedCourseService.updatePurchasedCourse({
      id: req.params.id,
      body: req.body,
    });

    if (serviceResponse.status == 400) {
      response.errors = serviceResponse.errors;
      response.message = serviceResponse.message;
    } else {
      response.body = serviceResponse.body;
      response.status = 200;
      response.message = constants.courseMessage.COURSE_UPDATED;
    }
  } catch (error) {
    console.log(
      `Something Went Wrong Controller: courseController: updatePurchasedCourse`,
      error.message
    );

    response.errors = error;
    response.message = error.message;
  }
  res.status(response.status).send(response);
};
