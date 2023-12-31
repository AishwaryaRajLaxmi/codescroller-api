const topicService = require("../services/topicService");
const constants = require("../helpers/constants");
const _ = require("lodash");

// createTopic
module.exports.createTopic = async (req, res) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const serviceResponse = await topicService.createTopic(req.body);

    if (serviceResponse.status === 400) {
      response.errors = serviceResponse.errors;
      response.message = serviceResponse.message;
    } else {
      response.body = serviceResponse;
      response.message = constants.topicMessage.TOPIC_CREATED;
      response.status = 200;
    }
  } catch (error) {
    console.log(
      `Something went wrong controller : TopicController :createTopic \nError: ${error.message}`
    );

    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// getAllTopics
module.exports.getAllTopics = async (req, res) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const serviceResponse = await topicService.getAllTopics(req.query);
    if (serviceResponse.status === 400) {
      response.message = serviceResponse.message;
      response.errors = serviceResponse.errors;
    } else {
      response.body = serviceResponse.body;
      response.totalPages = serviceResponse.totalPages;
      response.totalRecords = serviceResponse.totalRecords;
      response.page = serviceResponse.page;
      response.status = 200;
      response.message = constants.topicMessage.TOPIC_FETCHED;
    }
  } catch (error) {
    console.log(`Something went wrong:controller:TopicController: getAllTopics
    Error:${error.message}`);

    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// deleteTopic
module.exports.deleteTopic = async (req, res) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const serviceResponse = await topicService.deleteTopic(req.params);
    if (serviceResponse.status == 400) {
      response.message = serviceResponse.message;
      response.errors = serviceResponse.errors;
    } else {
      response.body = serviceResponse.body;
      response.message = constants.topicMessage.TOPIC_DELETED;
      response.status = 200;
    }
  } catch (error) {
    console.log(`Something went wrong:controller:TopicController: getAllTopics
      Error:${error.message}`);

    response.message = error.message;
    response.errors = {
      error: error.message,
    };
  }
  res.status(response.status).send(response);
};

// getTopic
module.exports.getTopicById = async (req, res) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const serviceResponse = await topicService.getTopicById(req.params);
    if (serviceResponse.status === 400) {
      response.message = serviceResponse.message;
      response.errors = serviceResponse.errors;
    } else {
      response.body = serviceResponse.body;
      response.status = 200;
      response.message = constants.topicMessage.TOPIC_FETCHED;
    }
  } catch (error) {
    console.log(`Something went wrong:controller:TopicController: getTopicById
    Error:${error.message}`);
    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// updateTopic
module.exports.updateTopic = async (req, res) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const serviceResponse = await topicService.updateTopic({
      id: req.params.id,
      body: req.body,
    });

    if (serviceResponse.status === 400) {
      response.message = serviceResponse.message;
      response.errors = serviceResponse.errors;
    } else {
      response.body = serviceResponse;
      response.status = 200;
      response.message = constants.topicMessage.TOPIC_UPDATED;
    }
  } catch (error) {
    console.log(
      `Something went wrong: Controller : TopicController : updateTopic ${error.message}`
    );

    response.errors = error;
    response.message = error.message;
  }
  res.status(response.status).send(response);
};
