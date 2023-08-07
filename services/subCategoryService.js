const constants = require("../helpers/constants");
const { formatMongoData } = require("../helpers/dbHelper");
const subCategoryModel = require("../database/models/subCategoryModel");
const _ = require("lodash");

// createSubCategory
module.exports.createSubCategory = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const categoryResponse = await subCategoryModel.findOne({
      name: serviceData.name,
    });

    if (categoryResponse) {
      response.errors = {
        name: constants.subCategoryMessage.SUB_CATEGORY_ALREADY_EXISTS,
      };
      response.message =
        constants.subCategoryMessage.SUB_CATEGORY_ALREADY_EXISTS;
      return response;
    }

    const newData = new subCategoryModel(serviceData);
    const dbResponse = await newData.save();

    if (dbResponse) {
      response.body = formatMongoData(dbResponse);
      response.status = 200;
    } else {
      response.errors = {
        error: constants.subCategoryMessage.SUB_CATEGORY_NOT_CREATED,
      };
      response.message = constants.subCategoryMessage.SUB_CATEGORY_NOT_CREATED;
    }
    return response;
  } catch (error) {
    console.log(
      `Something went wrong service : subCategoryService : createSubCategory\nError: ${error.message}`
    );
  }
};

// getAllSubCategories
module.exports.getAllSubCategories = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const {
      limit = 10,
      page = 1,
      status = "true",
      searchQuery,
      category,
    } = serviceData;
    let conditions = {};
    // Set the condition for active users (where isDeleted is false)
    conditions.isDeleted = false;

    // status condition
    if (status == "true" || status == "false") {
      conditions.status = status;
    }

    // search query
    if (searchQuery) {
      const regex = new RegExp(searchQuery, "i");
      conditions.$or = [{ name: regex }, { slug: regex }];
    }

    // search Subcategories by category
    if (category) {
      conditions.category = category;
    }

    // count document
    const totalRecords = await subCategoryModel.countDocuments(conditions);
    const totalPages = Math.ceil(totalRecords / parseInt(limit));

    const dbResponse = await subCategoryModel
      .find(conditions)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .populate({ path: "category", select: "name _id" })
      .limit(parseInt(limit));

    if (!dbResponse) {
      response.errors = {
        error: constants.subCategoryMessage.SUB_CATEGORY_NOT_FOUND,
      };
      response.message = constants.subCategoryMessage.SUB_CATEGORY_NOT_FOUND;
      return response;
    }

    response.status = 200;
    const formatData = formatMongoData(dbResponse);
    return {
      body: formatData,
      totalPages,
      totalRecords,
      page,
    };
  } catch (error) {
    console.log(
      `Something went wrong: Service: subcategoryService: getAllSubCategories\nError: ${error.message}`
    );
    throw new Error(error);
  }
};

// getSubCategoryById
module.exports.getSubCategoryById = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const dbResponse = await subCategoryModel
      .findOne({ _id: serviceData.id, isDeleted: false })
      .populate({ path: "category", select: "name _id" });

    if (!dbResponse) {
      response.errors = {
        error: constants.subCategoryMessage.SUB_CATEGORY_NOT_FOUND,
      };
      response.message = constants.subCategoryMessage.SUB_CATEGORY_NOT_FOUND;
      return response;
    }
    response.body = formatMongoData(dbResponse);
    response.status = 200;
    return response;
  } catch (error) {
    console.log(
      `Something went wrong: service : subCategoryService : getSubcategoryservice`
    );
    throw new Error(error);
  }
};

// updateSubCategory
module.exports.updateSubCategory = async (serviceData) => {
  try {
    const response = _.cloneDeep(constants.defaultServerResponse);
    const { id, body } = serviceData;
    const dbResponse = await subCategoryModel.findOneAndUpdate(
      { _id: id },
      body,
      {
        new: true,
      }
    );

    if (!dbResponse) {
      response.errors = {
        error: constants.subCategoryMessage.SUB_CATEGORY_NOT_UPDATED,
      };
      response.message = constants.subCategoryMessage.SUB_CATEGORY_NOT_UPDATED;
      return response;
    }
    response.body = formatMongoData(dbResponse);
    response.status = 200;
    return response;
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: subcategoryService: updateSubCategory`,
      error.message
    );
    throw new Error(error);
  }
};

// deleteSubCategory
module.exports.deleteSubCategory = async (serviceData) => {
  try {
    const response = _.cloneDeep(constants.defaultServerResponse);
    const isSubCategoryExist = await subCategoryModel.findOne({
      _id: serviceData.id,
      isDeleted: true,
    });
    if (isSubCategoryExist) {
      response.errors = {
        name: constants.subCategoryMessage.SUB_CATEGORY_NOT_EXISTS,
      };
      return response;
    }

    const dbResponse = await subCategoryModel.findOneAndUpdate(
      { _id: serviceData.id }, // Condition to find the document
      { isDeleted: true }, // Update to set isDeleted field to true
      { new: true } // Options to return the updated document
    );

    if (!dbResponse) {
      response.errors = {
        error: constants.subCategoryMessage.SUB_CATEGORY_NOT_DELETED,
      };
      response.message = constants.subCategoryMessage.SUB_CATEGORY_NOT_DELETED;
      return response;
    }

    response.body = formatMongoData(dbResponse);
    response.status = 200;
    return response;
  } catch (error) {
    console.log(
      `Something went wrong: service : subcategoryService : deletesubcategory`
    );
    throw new Error(error);
  }
};
