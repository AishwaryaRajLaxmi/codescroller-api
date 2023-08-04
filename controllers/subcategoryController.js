const subCategoryService = require("../services/subCategoryService");
const constants = require("../helpers/constants");

// createSubCategory
module.exports.createSubCategory = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await subCategoryService.createSubCategory(
      req.body
    );

    if (serviceResponse.status === 400) {
      response.errors = serviceResponse.errors;
      response.message = serviceResponse.message;
    } else {
      response.body = serviceResponse.body;
      response.message = constants.subCategoryMessage.SUB_CATEGORY_CREATED;
      response.status = 200;
    }
  } catch (error) {
    console.log(
      `Something went wrong controller : SubCategoryController :createSubCategory \nError: ${error.message}`
    );
    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// getAllSubCategories
module.exports.getAllSubCategories = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await subCategoryService.getAllSubCategories(
      req.query
    );

    if (serviceResponse.status === 400) {
      response.errors = serviceResponse.errors;
      response.message = serviceResponse.message;
    } else {
      response.body = serviceResponse.body;
      response.totalPages = serviceResponse.totalPages;
      response.totalRecords = serviceResponse.totalRecords;
      response.page = serviceResponse.page;
      response.status = 200;
      response.message = constants.subCategoryMessage.SUB_CATEGORY_FETCHED;
    }
  } catch (error) {
    console.log(`Something went wrong:controller:SubCategoryController: getAllSubCategories
    Error:${error.message}`);

    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// getSubCategoryById
module.exports.getSubCategoryById = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await subCategoryService.getSubCategoryById(
      req.params
    );
    if (serviceResponse.status === 400) {
      response.errors = serviceResponse.errors;
      response.message = serviceResponse.message;
    } else {
      response.body = serviceResponse.body;
      response.status = 200;
      response.message = constants.subCategoryMessage.SUB_CATEGORY_FETCHED;
    }
  } catch (error) {
    console.log(`Something went wrong:controller:SubCategoryController: getSubCategoryById
    Error:${error.message}`);
    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// updateSubCategory
module.exports.updateSubCategory = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await subCategoryService.updateSubCategory({
      id: req.params.id,
      body: req.body,
    });

    if (serviceResponse.status === 400) {
      response.errors = serviceResponse.errors;
      response.message = serviceResponse.message;
    } else {
      response.body = serviceResponse.body;
      response.status = 200;
      response.message = constants.subCategoryMessage.SUB_CATEGORY_UPDATED;
    }
  } catch (error) {
    console.log(
      `Something went wrong: Controller : SubCategoryController : updateSubCategory ${error.message}`
    );

    response.errors = error;
    response.message = error.message;
  }
  res.status(response.status).send(response);
};

// deleteSubCategory
module.exports.deleteSubCategory = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await subCategoryService.deleteSubCategory(
      req.params
    );
    if (serviceResponse.status == 400) {
      response.message = serviceResponse.message;
      response.errors = serviceResponse.errors;
    } else {
      response.body = serviceResponse.body;
      response.message = constants.subCategoryMessage.SUB_CATEGORY_DELETED;
      response.status = 200;
     
    }
  } catch (error) {
    console.log(`Something went wrong:controller:SubCategoryController: getAllCategories
      Error:${error.message}`);

    response.message = error.message;
    response.errors = {
      error: error.message,
    };
  }
  res.status(response.status).send(response);
};
