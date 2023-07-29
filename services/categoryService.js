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
        name: "Category already exists",
      };
      return response;
    }
    const newData = new categoryModel(serviceData);

    const serviceResponse = await newData.save();
    return formatMongoData(serviceResponse);
  } catch (error) {
    console.log(
      `Something went wrong service : categoryService : createCategory\nError: ${error.message}`
    );
    const keyValue = {};
    for (const key of Object.keys(error.keyValue)) {
      keyValue[key] = error.keyValue[key];
    }
    const errorMessage = JSON.stringify(keyValue);
    throw new Error(errorMessage + " is duplicate");
  }
};

// getAllCategories
module.exports.getAllCategories = async (serviceData) => {
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

// deleteCategory
module.exports.deleteCategory = async (serviceData) => {
  try {
    const response = { ...constants.defaultServerResponse };

    const dbResponse = await categoryModel.findOneAndUpdate(
      { _id: serviceData.id }, // Condition to find the document
      { isDeleted: true }, // Update to set isDeleted field to true
      { new: true } // Options to return the updated document
    );

    if (!dbResponse) {
      response.errors = {
        error: constants.categoryMessage.CATEGORY_NOT_DELETED,
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
    const dbResponse = await categoryModel.findOne({
      _id: serviceData.id,
      isDeleted: false,
    });
    const formatData = formatMongoData(dbResponse);
    return formatData;
  } catch (error) {
    console.log(
      `Something went wrong: service : categoryService : deleteCategory`
    );
    throw new Error(error);
  }
};

// updateCategory

module.exports.updateCategory = async (serviceData) => {
  try {
    const { id, body } = serviceData;
    const dbResponse = await categoryModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      body,
      { new: true }
    );
    console.log(dbResponse);

    return formatMongoData(dbResponse);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: categoryService: updateCategory`,
      error.message
    );
    throw new Error(error);
  }
};
