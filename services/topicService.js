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
        email: "Topic already exists",
        status: 400,
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
    const { limit = 10, skip = 0, status = true } = serviceData;
    let conditions = {};
    // Set the condition for active users (where isDeleted is false)
    conditions.isDeleted = false;

    // status condition
    if (status == true || status == false) {
      conditions.status = status;
    }

    const dbResponse = await topicModel
      .find(conditions)
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    const formatData = formatMongoData(dbResponse);
    // console.log(formatData)
    return formatData;
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
    console.log(dbResponse);

    if (!dbResponse) {
      response.errors = {
        error: constants.TopicMessage.TOPIC_NOT_DELETED,
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
  console.log(serviceData.id);
  try {
    const dbResponse = await topicModel.findById(serviceData.id);
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
    console.log(dbResponse);
    return formatMongoData(dbResponse);
  } catch (error) {
    console.log(
      `Somthing Went Wrong Service: TopicService: updateTopic`,
      error.message
    );
    throw new Error(error);
  }
};
