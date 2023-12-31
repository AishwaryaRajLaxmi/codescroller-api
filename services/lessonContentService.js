const lessonModel = require("../database/models/lessonModel");
const constants = require("../helpers/constants");
const { formatMongoData } = require("../helpers/dbHelper");
const _ = require("lodash");

// createContent
module.exports.createLessonContent = async (lessonId, body) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const lessonResponse = await lessonModel.findOne({
      _id: lessonId,
    });
    
    if (lessonResponse) {
      const duplicateContent = lessonResponse.contents.find(
        (content) => content.slug === body.slug
      );

      if (duplicateContent) {
        response.errors = {
          name: "Duplicate Slug Not Allowed",
        };
        response.status = 400;
        return response;
      }
      lessonResponse.contents.push(body);
      await lessonResponse.save();
      response.body = {
        message: constants.contentMessage.CONTENT_CREATED,
      };
      response.status = 200;
    } else {
      response.message = constants.lessonMessage.LESSON_NOT_FOUND;
    }

    return response;
  } catch (error) {
    console.log(
      `Something went wrong service : lessonContentService : createlessonContent\nError: ${error.message}`
    );
    throw new Error(error.message);
  }
};

// updateContent
module.exports.updateLessonContent = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const { id, body } = serviceData;

    const updateObject = {};
    for (const key in body) {
      updateObject[`contents.$.${key}`] = body[key];
    }

    const dbResponse = await lessonModel.findOneAndUpdate(
      { "contents._id": id },
      { $set: updateObject },
      { new: true }
    );

    if (!dbResponse) {
      response.errors = {
        error: constants.contentMessage.CONTENT_NOT_UPDATED,
      };
      response.message = constants.contentMessage.CONTENT_NOT_UPDATED;
      return response;
    }
    response.body = formatMongoData(dbResponse);
    response.status = 200;
    return response;
  } catch (error) {
    console.log(
      `Something went wrong: Service : contentService : updatecontent ${error.message}`
    );
    throw new Error(error);
  }
};

// getLessonContentById
module.exports.getLessonContentById = async (serviceData) => {
  try {
    const response = _.cloneDeep(constants.defaultServerResponse);

    const contentId = serviceData.contentId;

    // Find the lesson that contains the matching content by _id
    const lesson = await lessonModel.findOne({
      "contents._id": contentId
    });

    if (!lesson || !lesson.contents || lesson.contents.length === 0) {
      response.errors = {
        error: constants.contentMessage.CONTENT_NOT_FOUND,
      };
      response.message = constants.contentMessage.CONTENT_NOT_FOUND;
      return response;
    }

    // Find the matching content within the contents array by comparing _id
    const matchingContent = lesson.contents.find(content => content._id.toString() === contentId);

    if (!matchingContent) {
      response.errors = {
        error: constants.contentMessage.CONTENT_NOT_FOUND,
      };
      response.message = constants.contentMessage.CONTENT_NOT_FOUND;
      return response;
    }

    response.body = formatMongoData(matchingContent);
    response.status = 200;
    return response;
  } catch (error) {
    console.log(
      `Something went wrong: service : lessonContentService : getLessonContentById`
    );
    throw new Error(error);
  }
};



module.exports.deleteLessonContent = async (serviceData) => {
  try {
    const response = _.cloneDeep(constants.defaultServerResponse);
    // Ensure serviceData has the required properties
    if (!serviceData || !serviceData.contentId) {
      throw new Error("Invalid serviceData. Missing contentId.");
    }

    let filter = { "contents._id": serviceData.contentId }; // Corrected filter using _id
    const dbResponse = await lessonModel.findOneAndUpdate(
      filter,
      { $pull: { contents: { _id: serviceData.contentId } } },
      { new: true }
    );

    if (!dbResponse) {
      response.errors = {
        error: constants.contentMessage.CONTENT_NOT_DELETED,
      };
      return response;
    }

    response.body = constants.contentMessage.CONTENT_DELETED;
    response.status = 200;

    return response;
  } catch (error) {
    console.error("Something went wrong:", error.message);
    throw new Error(error);
  }
};
