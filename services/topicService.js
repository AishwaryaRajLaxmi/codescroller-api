const constants = require("../helpers/constants");
const { formatMongoData } = require("../helpers/dbHelper");
const topicModel = require("../database/models/topicModel");

// createTopic
module.exports.createTopic = async (serviceData) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const dbResponse = await topicModel.findOne({
      name: serviceData.name,
    });

    if (dbResponse) {
      response.errors = {
        name: "Topic already exists",
      };
      return response;
    }
    const newData = new topicModel(serviceData);

    const serviceResponse = await newData.save();
    return formatMongoData(serviceResponse);
  } catch (error) {
    console.log(
      `Something went wrong service : userService : createTopic\nError: ${error.message}`
    );
    throw new Error(error.message);
  }
};

// getAllTopics
module.exports.getAllTopics = async (serviceData) => {
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
      conditions.$or = [{ name: regex }, { email: regex }, { mobile: regex }];
    }

    // count document
    const totalRecords = await topicModel.countDocuments(conditions);
    const totalPages = Math.ceil(totalRecords / parseInt(limit));

    const dbResponse = await topicModel
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
      `Something went wrong: Service: TopicService: getAllTopics\nError: ${error.message}`
    );
    throw new Error(error);
  }
};

// deleteTopic
module.exports.deleteTopic = async (serviceData) => {
  try {
    const response = { ...constants.defaultServerResponse };

    const dbResponse = await topicModel.findOneAndUpdate(
      { _id: serviceData.id }, // Condition to find the document
      { isDeleted: true }, // Update to set isDeleted field to true
      { new: true } // Options to return the updated document
    );

    if (!dbResponse) {
      response.errors = {
        error: constants.topicMessage.TOPIC_NOT_DELETED,
      };
      return response;
    }

    response.body = dbResponse;
    response.status = 200;

    return response;
  } catch (error) {
    console.log(`Something went wrong: service : TopicService : deleteTopic`);
    throw new Error(error);
  }
};

// getTopicById
module.exports.getTopicById = async (serviceData) => {
  const response = { ...constants.defaultServerResponse };
  
  try {
    const dbResponse = await topicModel.findOne({
      _id: serviceData.id,
      isDeleted: false,
    });
    const formatData = formatMongoData(dbResponse);
    return formatData;
  } catch (error) {
    console.log(
      `Something went wrong: service : LaaguageService : deleteTopic`
    );
    throw new Error(error);
  }
};

// updateTopic

module.exports.updateTopic = async (serviceData) => {
  try {
    const { id, body } = serviceData;
    const dbResponse = await topicModel.findByIdAndUpdate(id, body, {
      new: true,
    });
   
    return formatMongoData(dbResponse);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: TopicService: updateTopic`,
      error.message
    );
    throw new Error(error);
  }
};
