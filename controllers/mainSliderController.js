const constants = require("../helpers/constants");
const mainSliderService = require("../services/mainSliderService");
const _ = require("lodash");

// createMainSlider
module.exports.createMainSlider = async (req, res) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const serviceResponse = await mainSliderService.createMainSlider(req.body);

    if (serviceResponse.status === 400) {
      response.errors = serviceResponse.errors;
      response.message = serviceResponse.message;
    } else {
      response.body = serviceResponse.body;
      response.message = constants.mainSliderMessage.MAIN_SLIDER_CREATED;
      response.status = 200;
    }
  } catch (error) {
    console.log(`Something went wrong:controller:mainSliderController: createMainSlider
    Error:${error.message}`);
    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// getMainSliderById

module.exports.getMainSliderById = async (req, res) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const serviceResponse = await mainSliderService.getMainSliderById(
      req.params,
      req.query
    );

    if (serviceResponse.status === 400) {
      response.errors = serviceResponse.errors;
      response.message = serviceResponse.message;
    } else {
      response.body = serviceResponse.body;
      response.status = 200;
      response.message = constants.mainSliderMessage.MAIN_SLIDER_FOUND;
    }
  } catch (error) {
    console.log(`Something went wrong:controller:mainSliderController: getMainSliderById
    Error:${error.message}`);
    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// getAllMainSliders

module.exports.getAllMainSliders = async (req, res) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const serviceResponse = await mainSliderService.getAllMainSliders(
      req.query
    );

    if (serviceResponse == 400) {
      response.errors = serviceResponse.errors;
      response.message = serviceResponse.message;
    } else {
      response.body = serviceResponse.body;
      response.totalPages = serviceResponse.totalPages;
      response.totalRecords = serviceResponse.totalRecords;
      response.page = serviceResponse.page;
      response.status = 200;
      response.message = constants.mainSliderMessage.MAIN_SLIDER_FETCHED;
    }
  } catch (error) {
    console.log(`Something went wrong:controller:mainSliderController: getAllMainSliders
    Error:${error.message}`);

    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// deleteCourse
module.exports.deleteMainSlider = async (req, res) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const serviceResponse = await mainSliderService.deleteMainSlider(
      req.params
    );
    if (serviceResponse.status == 400) {
      response.message = serviceResponse.message;
      response.status = 400;
      response.errors = serviceResponse.errors;
    } else {
      response.body = serviceResponse.body;
      response.message = constants.mainSliderMessage.MAIN_SLIDER_DELETED;
      response.status = 200;
    }
  } catch (error) {
    console.log(`Scomething went wrong:controller:mainSliderController: deleteMainSlider
      Error:${error.message}`);

    response.message = error.message;
    response.errors = {
      error: error.message,
    };
  }
  res.status(response.status).send(response);
};

// updateMainSlider
module.exports.updateMainSlider = async (req, res) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const serviceResponse = await mainSliderService.updateMainSlider({
      id: req.params.id,
      body: req.body,
    });

    if (serviceResponse.status == 400) {
      response.errors = serviceResponse.errors;
      response.message = serviceResponse.message;
    } else {
      response.body = serviceResponse.body;
      response.status = 200;
      response.message = constants.mainSliderMessage.MAIN_SLIDER_DELETED;
    }
  } catch (error) {
    console.log(
      `Something Went Wrong Controller: courseController: updateMainSlider`,
      error.message
    );

    response.errors = error;
    response.message = error.message;
  }
  res.status(response.status).send(response);
};
