const bcrypt = require("bcrypt");
const constants = require("../helpers/constants");
const { formatMongoData } = require("../helpers/dbHelper");
const subCategoryModel = require("../database/models/subCategoryModel");

// createCategory
module.exports.createSubCategory = async (serviceData) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const categoryResponse = await subCategoryModel.findOne({
      name: serviceData.name,
    });

    if (categoryResponse) {
      response.errors = {
        name: "SubCategoryalready exists",
      };
      return response;
    }
    const newData = new subCategoryModel(serviceData);

    const serviceResponse = await newData.save();
    return formatMongoData(serviceResponse);
  } catch (error) {
    console.log(
      `Something went wrong service : userService : createSubCategory\nError: ${error.message}`
    );
    throw new Error(error.message);
  }
};

// getAllSubCategories
module.exports.getAllSubCategories = async (serviceData) => {
  try {
    const { limit = 10, page = 1, status = "true", searchQuery } = serviceData;
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

    // count document
    const totalRecords = await subCategoryModel.countDocuments(conditions);
    const totalPages = Math.ceil(totalRecords / parseInt(limit));

    const dbResponse = await subCategoryModel
      .find(conditions)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .populate({ path: "category", select: "name _id" })
      .limit(parseInt(limit));

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

// deleteCategory
module.exports.deleteSubCategory = async (serviceData) => {
  try {
    const response = { ...constants.defaultServerResponse };

    const dbResponse = await subCategoryModel.findOneAndUpdate(
      { _id: serviceData.id }, // Condition to find the document
      { isDeleted: true }, // Update to set isDeleted field to true
      { new: true } // Options to return the updated document
    );

    if (!dbResponse) {
      response.errors = {
        error: constants.SubCategoryMessage.SUB_CATEGORY_DELETED,
      };
      return response;
    }

    response.body = dbResponse;
    response.status = 200;

    return response;
  } catch (error) {
    console.log(
      `Something went wrong: service : subcategoryService : deletesubcategory`
    );
    throw new Error(error);
  }
};

// getSubCategoryById
module.exports.getSubCategoryById = async (serviceData) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const dbResponse = await subCategoryModel
      .findOne({ _id: serviceData.id, isDeleted: false })
      .populate({ path: "category", select: "name _id" });
    const formatData = formatMongoData(dbResponse);
    return formatData;
  } catch (error) {
    console.log(
      `Something went wrong: service : subCategoryService : deletecategoryservice`
    );
    throw new Error(error);
  }
};

// updateCategory

module.exports.updateSubCategory = async (serviceData) => {
  try {
    const { id, body } = serviceData;
    const dbResponse = await subCategoryModel.findOneAndUpdate(
      { _id: serviceData.id, isDeleted: false },
      body,
      {
        new: true,
      }
    );
    return formatMongoData(dbResponse);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: subcategoryService: updateSubCategory`,
      error.message
    );
    throw new Error(error);
  }
};
