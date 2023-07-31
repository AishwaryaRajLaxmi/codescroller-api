const lessonModel = require("../database/models/lessonModel");
const constants = require("../helpers/constants");
const { formatMongoData } = require("../helpers/dbHelper");

// createLesson
module.exports.createLesson = async (serviceData) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const lessonResponse = await lessonModel.findOne({
      name: serviceData.name,
    });

    if (lessonResponse) {
      response.errors = {
        name: "lesson already exists",
      };

      return response;
    }

    const newData = new lessonModel(serviceData);
    const serviceResponse = await newData.save();
    return serviceResponse;
  } catch (error) {
    console.log(
      `Something went wrong service : lessonService : createLesson\nError: ${error.message}`
    );
    throw new Error(error.message);
  }
};

// getlessonById
module.exports.getLessonById = async (serviceData) => {
  try {
    const serviceResponse = await lessonModel
      .findOne({
        _id: serviceData.id,
        isDeleted: false,
      })
      .populate({ path: "course", select: "name _id" });

    const formatData = formatMongoData(serviceResponse);
    return formatData;
  } catch (error) {
    console.log(
      `Something went wrong: service : lessonService : getLessonById`
    );
    throw new Error(error);
  }
};

// getAlllesson
module.exports.getAllLessons = async (serviceData) => {
  try {
    const {
      limit = 10,
      page = 1,
      status = "true",
      searchQuery,
      course,
      serialNo
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

    const serviceResponse = await lessonModel
      .find(conditions)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .populate({ path: "course", select: "name _id" });

    const formatData = formatMongoData(serviceResponse);

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
    const response = { ...constants.defaultServerResponse };

    const serviceResponse = await lessonModel.findOneAndUpdate(
      { _id: serviceData.id },
      { isDeleted: true },
      { new: true }
    );

    if (!serviceResponse) {
      response.errors = {
        error: constants.lessonMessage.LESSON_DELETED,
      };
      return response;
    }

    response.body = serviceResponse;
    response.status = 200;

    return response;
  } catch (error) {
    console.log(`Something went wrong: service : lessonService : deleteLesson`);
    throw new Error(error);
  }
};

// updateLesson
module.exports.updateLesson = async (serviceData) => {
  try {
    const { id, body } = serviceData;
    const serviceResponse = await lessonModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return formatMongoData(serviceResponse);
  } catch (error) {
    console.log(
      `Something went wrong: Service : lessonService : updateLesson ${error.message}`
    );
    throw new Error(error);
  }
};
