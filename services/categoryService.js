const constants = require("../helpers/constants");
const { formatMongoData } = require("../helpers/dbHelper");
const categoryModel = require("../database/models/categoryModel");
const _ = require("lodash");

// createCategory
module.exports.createCategory = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const categoryResponse = await categoryModel.findOne({
      name: serviceData.name,
    });

    if (categoryResponse) {
      response.errors = {
        name: constants.categoryMessage.CATEGORY_ALREADY_EXISTS,
      };
      response.message = constants.categoryMessage.CATEGORY_ALREADY_EXISTS;
      return response;
    }

    const newData = new categoryModel(serviceData);
    const dbResponse = await newData.save();
    if (dbResponse) {
      response.body = formatMongoData(dbResponse);
      response.status = 200;
    } else {
      response.errors = {
        error: constants.categoryMessage.CATEGORY_NOT_CREATED,
      };
      response.message = constants.categoryMessage.CATEGORY_NOT_CREATED;
    }

    return response;
  } catch (error) {
    console.log(
      `Something went wrong service : categoryService : createCategory\nError: ${error.message}`
    );

    throw new Error(error);
  }
};

// getAllCategories
module.exports.getAllCategories = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const { limit = 10, page = 1, status = "true", searchQuery } = serviceData;
    let conditions = {};
    conditions.isDeleted = false;

    // status condition
    if (status == "true" || status == "false") {
      conditions.status = status;
    }

    // search query
    if (searchQuery) {
      const regex = new RegExp(searchQuery, "i");
      conditions.$or = [
        { name: regex },
        { slug: regex },
        { description: regex },
      ];
    }

    // count document
    const totalRecords = await categoryModel.countDocuments(conditions);
    const totalPages = Math.ceil(totalRecords / parseInt(limit));

    const dbResponse = await categoryModel
      .find(conditions)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    if (!dbResponse) {
      response.errors = {
        error: constants.categoryMessage.CATEGORY_NOT_FOUND,
      };
      response.message = constants.categoryMessage.CATEGORY_NOT_FOUND;
      response.status = 200;
      return response;
    }
    const formatData = formatMongoData(dbResponse);

    return {
      body: formatData,
      totalPages,
      totalRecords,
      page,
    };
  } catch (error) {
    console.log(
      `Something went wrong: Service: categoryService: getAllCategories\nError: ${error.message}`
    );
    throw new Error(error);
  }
};

// getCategoryById
module.exports.getCategoryById = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const dbResponse = await categoryModel.findOne({
      _id: serviceData.id,
      isDeleted: false,
    });

    if (!dbResponse) {
      response.errors = {
        error: constants.categoryMessage.CATEGORY_NOT_FOUND,
      };
      response.message = constants.categoryMessage.CATEGORY_NOT_FOUND;
      return response;
    }
    response.body = formatMongoData(dbResponse);
    response.status = 200;
    return response;
  } catch (error) {
    console.log(
      `Something went wrong: service : categoryService : getCategoryById`
    );
    throw new Error(error);
  }
};

// updateCategory
module.exports.updateCategory = async (serviceData) => {
  try {
    const response = _.cloneDeep(constants.defaultServerResponse);
    const { id, body } = serviceData;
    const dbResponse = await categoryModel.findOneAndUpdate({ _id: id }, body, {
      new: true,
    });

    if (!dbResponse) {
      response.errors = {
        error: constants.categoryMessage.CATEGORY_NOT_UPDATED,
      };
      response.message = constants.categoryMessage.CATEGORY_NOT_UPDATED;
      return response;
    }
    response.body = formatMongoData(dbResponse);
    response.status = 200;
    return response;
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: categoryService: updateCategory`,
      error.message
    );
    throw new Error(error);
  }
};

// deleteCategory
module.exports.deleteCategory = async (serviceData) => {
  try {
    const response = _.cloneDeep(constants.defaultServerResponse);
    const isCategoryExist = await categoryModel.findOne({
      _id: serviceData.id,
      isDeleted: true,
    });
    if (isCategoryExist) {
      response.errors = {
        name: constants.categoryMessage.CATEGORY_NOT_EXISTS,
      };
      return response;
    }
    const dbResponse = await categoryModel.findOneAndUpdate(
      { _id: serviceData.id }, // Condition to find the document
      { isDeleted: true }, // Update to set isDeleted field to true
      { new: true } // Options to return the updated document
    );

    if (!dbResponse) {
      response.errors = {
        error: constants.categoryMessage.CATEGORY_NOT_DELETED,
      };
      response.message = constants.categoryMessage.CATEGORY_NOT_DELETED;
      return response;
    }

    response.body = formatMongoData(dbResponse);
    response.status = 200;
    return response;
  } catch (error) {
    console.log(
      `Something went wrong: service : categoryService : deletecategory`
    );
    throw new Error(error);
  }
};
