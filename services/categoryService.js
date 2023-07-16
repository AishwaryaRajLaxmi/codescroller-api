const bcrypt = require("bcrypt");
const constants = require("../helpers/constants");
const { formatMongoData } = require("../helpers/dbHelper");
const categoryModel = require("../database/models/categoryModel");

// createCategory
module.exports.createCategory = async (serviceData) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const categoryResponse = await categoryModel.findOne({
      name: serviceData.name,
    });

    if (categoryResponse) {
      response.errors = {
        email: "Category already exists",
        status: 400,
      };
      return response;
    }
    const newData = new categoryModel(serviceData);

    const serviceResponse = await newData.save();
    return formatMongoData(serviceResponse);
  } catch (error) {
    console.log(
      `Something went wrong service : userService : createCategory\nError: ${error.message}`
    );
    throw new Error(error.message);
  }
};

// getAllCategories
module.exports.getAllCategories = async (serviceData) => {
  try {
    const { limit = 10, skip = 0, status = true } = serviceData;
    let conditions = {};
    // Set the condition for active users (where isDeleted is false)
    conditions.isDeleted = false;

    // status condition
    if (status == true || status == false) {
      conditions.status = status;
    }

    const dbResponse = await categoryModel
      .find(conditions)
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    const formatData = formatMongoData(dbResponse);
    // console.log(formatData)
    return formatData;
  } catch (error) {
    console.log(
      `Something went wrong: Service: categoryService: getAllCategories\nError: ${error.message}`
    );
    throw new Error(error);
  }
};

// deleteCategory
module.exports.deleteCategory = async (serviceData) => {
  try {
    const response = { ...constants.defaultServerResponse };

    const dbResponse = await categoryModel.findOneAndUpdate(
      { _id: serviceData.id }, // Condition to find the document
      { isDeleted: true }, // Update to set isDeleted field to true
      { new: true } // Options to return the updated document
    );
    console.log(dbResponse);
    

    if (!dbResponse) {
      response.errors = {
        error: constants.CategoryMessage.CATEGORY_NOT_DELETED,
      };
      return response;
    }

    response.body = dbResponse;
    response.status = 200;

    return response;
  } catch (error) {
    console.log(
      `Something went wrong: service : categoryService : deletecategory`
    );
    throw new Error(error);
  }
};

// getCategoryById
module.exports.getCategoryById = async (serviceData) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const dbResponse = await categoryModel.findById(serviceData.id);
    const formatData = formatMongoData(dbResponse);
    return formatData;
  } catch (error) {
    console.log(`Something went wrong: service : userService : deleteUser`);
    throw new Error(error);
  }
};

// updateCategory

module.exports.updateCategory = async (serviceData) => {
  try {
    const { id, body } = serviceData;
    const dbResponse = await categoryModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return formatMongoData(dbResponse);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: categoryService: updateCategory`,
      error.message
    );
    throw new Error(error);
  }
};
