const express = require("express");
const topicRouter = express.Router();
const topicController = require("../controllers/topicController");
const {
  createTopic,
  getTopicById,
  updateTopic,
  getAllTopics,
} = require("../apiValidationSchemas/topicValidation");
const {
  validateBody,
  validateParams,
  validateQuery,
} = require("../middlewares/joiSchemaValidation");

// createCategory
topicRouter.post(
  "/",
  validateBody(createTopic),
  topicController.createTopic
);

//getAllTopics
topicRouter.get(
  "/",
  validateQuery(getAllTopics),
  topicController.getAllTopics
);

// deleteTopic
topicRouter.delete(
  "/:id",
  validateParams(getTopicById),
  topicController.deleteTopic
);

// getTopicById
topicRouter.get(
  "/:id",
  validateParams(getTopicById),
  topicController.getTopicById
);

// updateTopic
topicRouter.put(
  "/:id",
  validateParams(getTopicById),
  validateBody(updateTopic),
  topicController.updateTopic
);

module.exports = topicRouter;
