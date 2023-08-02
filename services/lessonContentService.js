const lessonModel = require("../database/models/lessonModel");
const constants = require("../helpers/constants");
const { formatMongoData } = require("../helpers/dbHelper");

// createContent
module.exports.createLessonContent = async (lessonId, body) => {
  const response = { ...constants.defaultServerResponse };

  try {
    const lessonResponse = await lessonModel.findOne({
      _id: lessonId,
    });

    if (lessonResponse) {
      lessonResponse.contents.push(body);
      const serviceResponse = await lessonResponse.save();
    } else {
      throw new Error("Lesson not found");
    }

    return (response.body = {
      message: "Content Created successfully",
    });
  } catch (error) {
    console.log(
      `Something went wrong service : lessonContentService : createlessonContent\nError: ${error.message}`
    );
    throw new Error(error.message);
  }
};
// updateContent
module.exports.updateLessonContent = async (serviceData) => {
  try {
    const { id, body } = serviceData;

    const updateObject = {};
    for (const key in body) {
      updateObject[`contents.$.${key}`] = body[key];
    }

    const serviceResponse = await lessonModel.findOneAndUpdate(
      { "contents._id": id },
      { $set: updateObject },
      { new: true }
    );

    const formatData = formatMongoData(serviceResponse);
    return formatData;
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
    const serviceResponse = await lessonModel.findOne(
      {
        "contents._id": serviceData.contentId,
        "contents.isDeleted": false,
      },
      {
        "contents.$": 1,
      }
    );

    if (
      !serviceResponse ||
      !serviceResponse.contents ||
      serviceResponse.contents.length === 0
    ) {
      console.log(`Content with ID ${serviceData.contentId} not found.`);
      return null;
    }
    const formatData = formatMongoData(serviceResponse.contents[0]);
    return formatData;
  } catch (error) {
    console.log(
      `Something went wrong: service : lessonContentService : getLessonContentById`
    );
    throw new Error(error);
  }
};

// // getAllcontent
// module.exports.getAllLessonsContents = async (serviceData) => {
//   try {
//     const {
//       limit = 10,
//       page = 1,
//       status = "true",
//       searchQuery,

//     } = serviceData;
//     let conditions = {};
//     conditions.isDeleted = false;

//     if (status == "true" || status == "false") {
//       conditions.status = status;
//     }

//     // search query
//     if (searchQuery) {
//       const regex = new RegExp(searchQuery, "i");
//       conditions.$or = [
//         { name: regex },
//         { description: regex },
//         { slug: regex },
//       ];
//     }

//     // count document
//     const totalRecords = await lessonModel.countDocuments(conditions);
//     const totalPages = Math.ceil(totalRecords / parseInt(limit));

//     const serviceResponse = await lessonModel
//       .find(conditions)
//       .skip((parseInt(page) - 1) * parseInt(limit))
//       .limit(parseInt(limit))
//       .populate({ path: "course", select: "name _id" });

//     const formatData = formatMongoData(serviceResponse);

//     return {
//       body: formatData,
//       totalPages,
//       totalRecords,
//       page,
//     };
//   } catch (error) {
//     console.log(
//       `Something went wrong: Service: contentService: getAllLessonsContents\nError: ${error.message}`
//     );
//     throw new Error(error);
//   }
// };

// deleteService
module.exports.deleteLessonContent = async (serviceData) => {
  try {
    const response = { ...constants.defaultServerResponse };

    // Ensure serviceData has the required properties
    if (!serviceData || !serviceData.contentId) {
      throw new Error("Invalid serviceData. Missing contentId.");
    }

    let filter = { _id: serviceData.contentId }; // Corrected filter using _id
    const serviceResponse = await lessonModel.findOneAndUpdate(
      filter,
      { $pull: { contents: { _id: serviceData.contentId } } },
      { new: true }
    );

    if (serviceResponse) {
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
    throw new Error(error)
  }
};
