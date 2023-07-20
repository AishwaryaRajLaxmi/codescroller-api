const constants = require("../helpers/constants");
const courseService = require("../services/courseService");

// createUser
module.exports.createCourse = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await courseService.createCourse(req.body);

    if (serviceResponse.status === 400) {
      response.errors = serviceResponse.errors;
      // response.message = constants.CourseMessage.COURSE_NOT_CREATED;
    } else {
      response.body = serviceResponse;
      response.message = constants.CourseMessage.COURSE_CREATED;
      response.status = 200;
    }
  } catch (error) {
    console.log(`Something went wrong:controller:courseController: createCourse
    Error:${error.message}`);
    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// getCourseByID

module.exports.getCourseById = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await courseService.getCourseById(req.params);
    response.body = serviceResponse;
    response.status = 200;
    response.message = constants.CourseMessage.COURSE_FETCHED;
  } catch (error) {
    console.log(`Something went wrong:controller:courseController: getCourseById
    Error:${error.message}`);
    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// getAllCourses

module.exports.getAllCourses = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await courseService.getAllCourses(req.query);
    response.body = serviceResponse;
    response.status = 200;
    response.message = constants.CourseMessage.COURSE_FETCHED;
  } catch (error) {
    console.log(`Something went wrong:controller:courseController: getAllCourses
    Error:${error.message}`);

    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// deleteCourse
module.exports.deleteCourse = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await courseService.deleteCourse(req.params);
    if (serviceResponse.status == 200) {
      response.body = serviceResponse.body;
      response.message = constants.CourseMessage.COURSE_DELETED;
      response.status = 200;
    } else {
      response.message = constants.CourseMessage.COURSE_DELETED;
      response.status = 400;
      response.errors = serviceResponse.errors;
    }
  } catch (error) {
    console.log(`Something went wrong:controller:courseController: getAllCourses
      Error:${error.message}`);

    response.message = error.message;
    response.errors = {
      error: error.message,
    };
  }
  res.status(response.status).send(response);
};

// updateCourse
module.exports.updateCourse = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await courseService.updateCourse({
      id: req.params.id,
      body: req.body,
    });

    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = constants.CourseMessage.COURSE_UPDATED;
    } else {
      response.message = constants.CourseMessage.COURSE_NOT_UPDATED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: courseController: updateCourse`,
      error.message
    );

    response.errors = error;
    response.message = error.message;
    throw new Error(error);
  }
  res.status(response.status).send(response);
};
