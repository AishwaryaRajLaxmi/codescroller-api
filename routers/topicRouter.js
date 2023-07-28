const express = require("express");
const topicRouter = express.Router();
const topicController = require("../controllers/topicController");
const {
  createTopic,
  getTopicById,
  updateTopic,
  getAllTopics,
} = require("../apiValidationSchemas/topicValidationSchema");
const {
  validateBody,
  validateParams,
  validateQuery,
} = require("../middlewares/joiSchemaValidation");
const { validateAdminToken } = require("../middlewares/jwtValidation");

// createTopic
topicRouter.post(
  "/",
  validateAdminToken,
  validateBody(createTopic),
  topicController.createTopic
);

//getAllTopics
topicRouter.get(
  "/",
  validateQuery(getAllTopics),
  validateAdminToken,
  topicController.getAllTopics
);

// deleteTopic
topicRouter.delete(
  "/:id",
  validateParams(getTopicById),
  validateAdminToken,
  topicController.deleteTopic
);

// getTopicById
topicRouter.get(
  "/:id",
  validateParams(getTopicById),
  validateAdminToken,
  topicController.getTopicById
);

// updateTopic
topicRouter.put(
  "/:id",
  validateParams(getTopicById),
  validateAdminToken,
  validateBody(updateTopic),
  topicController.updateTopic
);

module.exports = topicRouter;
