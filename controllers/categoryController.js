const categoryService = require("../services/categoryService");
const constants = require("../helpers/constants");
const _ = require("lodash");
// createCategory
module.exports.createCategory = async (req, res) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const serviceResponse = await categoryService.createCategory(req.body);
    if (serviceResponse.status === 400) {
      response.errors = serviceResponse.errors;
      response.message = serviceResponse.message;
    } else {
      response.body = serviceResponse.body;
      response.message = constants.categoryMessage.CATEGORY_CREATED;
      response.status = 200;
    }
  } catch (error) {
    console.log(
      `Something went wrong controller : categoryController :createCategory \nError: ${error.message}`
    );
    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// getAllCategories
module.exports.getAllCategories = async (req, res) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const serviceResponse = await categoryService.getAllCategories(req.query);
    if (serviceResponse.status == 400) {
      response.errors = serviceResponse.errors;
      response.message = serviceResponse.message;
    } else {
      response.body = serviceResponse.body;
      response.totalPages = serviceResponse.totalPages;
      response.totalRecords = serviceResponse.totalRecords;
      response.page = serviceResponse.page;
      response.status = 200;
      response.message = constants.categoryMessage.CATEGORY_FETCHED;
    }
  } catch (error) {
    console.log(`Something went wrong:controller:categoryController: getAllCategories
    Error:${error.message}`);

    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// deleteCategory
module.exports.deleteCategory = async (req, res) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const serviceResponse = await categoryService.deleteCategory(req.params);
    if (serviceResponse.status == 200) {
      response.body = serviceResponse.body;
      response.message = constants.categoryMessage.CATEGORY_DELETED;
      response.status = 200;
    } else {
      response.message = serviceResponse.message;
      response.errors = serviceResponse.errors;
    }
  } catch (error) {
    console.log(`Something went wrong:controller:categoryController: getAllCategories
      Error:${error.message}`);

    response.message = error.message;
    response.errors = {
      error: error.message,
    };
  }
  res.status(response.status).send(response);
};

// getCategoryById
module.exports.getCategoryById = async (req, res) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const serviceResponse = await categoryService.getCategoryById(req.params);

    if (serviceResponse.status === 400) {
      response.errors = serviceResponse.errors;
      response.message = serviceResponse.message;
    } else {
      response.body = serviceResponse.body;
      response.status = 200;
      response.message = constants.categoryMessage.CATEGORY_FETCHED;
    }
  } catch (error) {
    console.log(`Something went wrong:controller:categoryController: getCategoryById
    Error:${error.message}`);
    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// updateCategory
module.exports.updateCategory = async (req, res) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const serviceResponse = await categoryService.updateCategory({
      id: req.params.id,
      body: req.body,
    });

    if (serviceResponse.status === 400) {
      response.errors = serviceResponse.errors;
      response.message = serviceResponse.message;
    } else {
      response.body = serviceResponse.body;
      response.status = 200;
      response.message = constants.categoryMessage.CATEGORY_UPDATED;
    }
  } catch (error) {
    console.log(
      `Something went wrong: Controller : categoryController : updateCategory ${error.message}`
    );

    response.errors = error;
    response.message = error.message;
  }
  res.status(response.status).send(response);
};
