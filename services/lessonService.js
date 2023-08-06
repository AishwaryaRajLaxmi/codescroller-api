const lessonModel = require("../database/models/lessonModel");
const constants = require("../helpers/constants");
const { formatMongoData } = require("../helpers/dbHelper");

const _ = require("lodash");
// createLesson
module.exports.createLesson = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const lessonResponse = await lessonModel.findOne({
      name: serviceData.name,
    });

    if (lessonResponse) {
      response.errors = {
        name: constants.lessonMessage.LESSON_ALREADY_EXISTS,
      };
      response.message = constants.lessonMessage.LESSON_ALREADY_EXISTS;
      return response;
    }

    const courseLesson = await lessonModel
      .findOne({ course: serviceData.course })
      .sort({ createdAt: -1 })
      .limit(1);

    // if user is not sending serial number
    if (!serviceData.serialNo) {
      if (!courseLesson) {
        serviceData.serialNo = 1;
      } else {
        if (courseLesson.serialNo) {
          serviceData.serialNo = courseLesson.serialNo + 1;
        }
      }
    } else {
      // find record with the specified serialNo and course
      const existingLesson = await lessonModel
        .findOne({ serialNo: serviceData.serialNo, course: serviceData.course })
        .sort({ createdAt: -1 })
        .limit(1);

      if (existingLesson) {
        response.errors = {
          course: "This Serial Number already exists",
        };
        return response;
      } else {
        if (
          courseLesson &&
          courseLesson.serialNo !== serviceData.serialNo + 1
        ) {
          serviceData.serialNo = courseLesson.serialNo + 1;
        }
      }
    }

    const newData = new lessonModel(serviceData);
    const dbResponse = await newData.save();
    if (dbResponse) {
      response.body = formatMongoData(dbResponse);
      response.status = 200;
    } else {
      response.errors = {
        error: constants.lessonMessage.LESSON_NOT_CREATED,
      };
      response.message = constants.lessonMessage.LESSON_NOT_CREATED;
    }
    return response;
  } catch (error) {
    console.log(
      `Something went wrong service : lessonService : createLesson\nError: ${error.message}`
    );
    throw new Error(error.message);
  }
};

// getlessonById
module.exports.getLessonById = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  console.log(serviceData);
  try {
    const dbResponse = await lessonModel
      .findOne({
        _id: serviceData.id,
        isDeleted: false,
      })
      .populate({ path: "course", select: "name _id" });

    console.log(dbResponse);
    if (!dbResponse) {
      response.errors = {
        error: constants.lessonMessage.LESSON_NOT_FOUND,
      };
      response.message = constants.lessonMessage.LESSON_NOT_FOUND;
      return response;
    }
    response.body = formatMongoData(dbResponse);
    response.status = 200;
    return response;
  } catch (error) {
    console.log(
      `Something went wrong: service : lessonService : getLessonById`
    );
    throw new Error(error);
  }
};

// getAlllesson
module.exports.getAllLessons = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const {
      limit = 10,
      page = 1,
      status = "true",
      searchQuery,
      course,
      serialNo,
    } = serviceData;
    let conditions = {};
    conditions.isDeleted = false;

    if (status == "true" || status == "false") {
      conditions.status = status;
    }

    // search query
    if (searchQuery) {
      const regex = new RegExp(searchQuery, "i");
      conditions.$or = [
        { name: regex },
        { description: regex },
        { slug: regex },
      ];
    }
    if (serialNo) {
      conditions.serialNo = serialNo;
    }
    if (course) {
      conditions.course = course;
    }
    // count document
    const totalRecords = await lessonModel.countDocuments(conditions);
    const totalPages = Math.ceil(totalRecords / parseInt(limit));

    const dbResponse = await lessonModel
      .find(conditions)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .populate({ path: "course", select: "name _id" });

    if (!dbResponse) {
      response.errors = {
        error: constants.lessonMessage.LESSON_NOT_FOUND,
      };
      response.message = constants.lessonMessage.LESSON_NOT_FOUND;
      return response;
    }

    const formatData = formatMongoData(dbResponse);
    response.status = 200;

    return {
      body: formatData,
      totalPages,
      totalRecords,
      page,
    };
  } catch (error) {
    console.log(
      `Something went wrong: Service: lessonService: getAllLessons\nError: ${error.message}`
    );
    throw new Error(error);
  }
};

// deleteService
module.exports.deleteLesson = async (serviceData) => {
  try {
    const response = _.cloneDeep(constants.defaultServerResponse);
    const isLessonExist = await lessonModel.findOne({
      _id: serviceData.id,
      isDeleted: true,
    });
    if (isLessonExist) {
      response.errors = {
        name: constants.lessonMessage.LESSON_NOT_EXISTS,
      };
      return response;
    }

    const dbResponse = await lessonModel.findOneAndUpdate(
      { _id: serviceData.id },
      { isDeleted: true },
      { new: true }
    );

    if (!dbResponse) {
      response.errors = {
        error: constants.lessonMessage.LESSON_NOT_DELETED,
      };
      response.message = constants.lessonMessage.LESSON_NOT_DELETED;
      return response;
    }

    response.body = formatMongoData(dbResponse);
    response.status = 200;

    return response;
  } catch (error) {
    console.log(`Something went wrong: service : lessonService : deleteLesson`);
    throw new Error(error);
  }
};

// updateLesson
module.exports.updateLesson = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const { id, body } = serviceData;
    const dbResponse = await lessonModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!dbResponse) {
      response.errors = {
        error: constants.lessonMessage.LESSON_NOT_UPDATED,
      };
      response.message = constants.lessonMessage.LESSON_NOT_UPDATED;
      return response;
    }
    response.body = formatMongoData(dbResponse);
    response.status = 200;
  } catch (error) {
    console.log(
      `Something went wrong: Service : lessonService : updateLesson ${error.message}`
    );
    throw new Error(error);
  }
};
