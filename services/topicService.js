const constants = require("../helpers/constants");
const { formatMongoData } = require("../helpers/dbHelper");
const topicModel = require("../database/models/topicModel");
const _ = require("lodash");

// createTopic
module.exports.createTopic = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const topicResponse = await topicModel.findOne({
      name: serviceData.name,
    });

    if (topicResponse) {
      response.errors = {
        name: constants.topicMessage.TOPIC_ALREADY_EXISTS,
      };
      response.message = constants.categoryMessage.TOPIC_ALREADY_EXISTS;
      return response;
    }

    const newData = new topicModel(serviceData);
    const dbResponse = await newData.save();
    if (dbResponse) {
      response.body = formatMongoData(dbResponse);
      response.status = 200;
    } else {
      response.errors = {
        error: constants.topicMessage.TOPIC_CREATED,
      };
      response.message = constants.topicMessage.TOPIC_CREATED;
    }
    return response;
  } catch (error) {
    console.log(
      `Something went wrong service : topicService : createTopic\nError: ${error.message}`
    );
    throw new Error(error.message);
  }
};

// getAllTopics
module.exports.getAllTopics = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const {
      limit = 10,
      page = 1,
      status = "true",
      searchQuery,
      category,
      subCategory,
      subCategories,
    } = serviceData;

    let conditions = {};
    conditions.isDeleted = false;

    // status condition
    if (status == "true" || status == "false") {
      conditions.status = status;
    }
    // search query
    if (searchQuery) {
      const regex = new RegExp(searchQuery, "i");
      conditions.$or = [{ name: regex }, { email: regex }, { mobile: regex }];
    }

    // search by category and subCategory id
    if (category) {
      conditions.category = category;
    }
    if (subCategory) {
      conditions.subCategories = subCategory;
    }

    if (subCategories) {
      conditions.subCategories = { $in: subCategories };
    }

    // count document
    const totalRecords = await topicModel.countDocuments(conditions);
    const totalPages = Math.ceil(totalRecords / parseInt(limit));

    const dbResponse = await topicModel
      .find(conditions)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .populate({ path: "category", select: "name _id" })
      .populate({ path: "subCategories", select: "name _id" });

    if (!dbResponse) {
      response.errors = {
        error: constants.topicMessage.TOPIC_NOT_FOUND,
      };
      response.message = constants.topicMessage.TOPIC_NOT_FOUND;
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
      `Something went wrong: Service: TopicService: getAllTopics\nError: ${error.message}`
    );
    throw new Error(error);
  }
};

// deleteTopic
module.exports.deleteTopic = async (serviceData) => {
  try {
    const response = _.cloneDeep(constants.defaultServerResponse);
    const isTopicExist = await topicModel.findOne({
      _id: serviceData.id,
      isDeleted: true,
    });
    if (isTopicExist) {
      response.errors = {
        name: constants.topicMessage.TOPIC_NOT_EXISTS,
      };
      return response;
    }

    const dbResponse = await topicModel.findOneAndUpdate(
      { _id: serviceData.id }, // Condition to find the document
      { isDeleted: true }, // Update to set isDeleted field to true
      { new: true } // Options to return the updated document
    );

    if (!dbResponse) {
      response.errors = {
        error: constants.topicMessage.TOPIC_ALREADY_EXISTS,
      };
      response.message = constants.topicMessage.TOPIC_ALREADY_EXISTS;
      return response;
    }

    response.body = formatMongoData(dbResponse);
    response.status = 200;
    return response;
  } catch (error) {
    console.log(`Something went wrong: service : TopicService : deleteTopic`);
    throw new Error(error);
  }
};

// getTopicById
module.exports.getTopicById = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const dbResponse = await topicModel
      .findOne({
        _id: serviceData.id,
        isDeleted: false,
      })
      .populate({ path: "category", select: "name _id" })
      .populate({ path: "subCategories", select: "name _id" });

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
    console.log(`Something went wrong: service : laguageService : deleteTopic`);
    throw new Error(error);
  }
};

// updateTopic
module.exports.updateTopic = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const { id, body } = serviceData;
    const dbResponse = await topicModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!dbResponse) {
      response.errors = {
        error: constants.topicMessage.TOPIC_NOT_UPDATED,
      };
      response.message = constants.topicMessage.TOPIC_NOT_UPDATED;
      return response;
    }
    response.body = formatMongoData(dbResponse);
    response.status = 200;
    return response;
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: TopicService: updateTopic`,
      error.message
    );
    throw new Error(error);
  }
};
