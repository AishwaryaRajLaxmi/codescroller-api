const courseModel = require("../database/models/courseModel");
const lessonModel = require("../database/models/lessonModel");
const constants = require("../helpers/constants");
const { formatMongoData } = require("../helpers/dbHelper");
const _ = require("lodash");
// createCourse
module.exports.createCourse = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const courseResponse = await courseModel.findOne({
      name: serviceData.name,
    });

    if (courseResponse) {
      response.errors = {
        name: constants.courseMessage.COURSE_ALREADY_EXISTS,
      };
      response.message = constants.courseMessage.COURSE_ALREADY_EXISTS;
      return response;
    }

    const newData = new courseModel(serviceData);
    const dbResponse = await newData.save();
    if (dbResponse) {
      response.body = formatMongoData(dbResponse);
      response.status = 200;
    } else {
      response.errors = {
        error: constants.courseMessage.COURSE_NOT_CREATED,
      };
      response.message = constants.courseMessage.COURSE_NOT_CREATED;
    }
    return response;
  } catch (error) {
    console.log(
      `Something went wrong service : courseService : createCourse\nError: ${error.message}`
    );
    throw new Error(error.message);
  }
};

// getCourseById
module.exports.getCourseById = async (serviceData, lessonData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    let dbResponse = await courseModel
      .findOne({
        _id: serviceData.id,
        isDeleted: false,
      })
      .populate({ path: "language", select: "name _id" })
      .populate({ path: "level", select: "name _id" })
      .populate({ path: "category", select: "name _id" })
      .populate({ path: "subCategories", select: "name _id" })
      .populate({ path: "topics", select: "name _id" });

    if (!dbResponse) {
      response.errors = {
        error: constants.courseMessage.COURSE_NOT_FOUND,
      };
      response.message = constants.courseMessage.COURSE_NOT_FOUND;
      return response;
    }

    let lessonResponse;
    if (lessonData.lessonData === "true") {
      lessonResponse = await lessonModel.findOne({ course: serviceData.id });
    }

    if (lessonResponse) {
      // Merge the properties of dbResponse with the lessonResponse
      dbResponse = {
        ...dbResponse._doc,
        lessons: lessonResponse,
      };
    }
    response.body = formatMongoData(dbResponse);
    response.status = 200;
    return response;
  } catch (error) {
    console.log(
      `Something went wrong: service : courseService : getCourseById`
    );
    throw new Error(error);
  }
};

// getAllCourse
module.exports.getAllCourses = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const {
      limit = 10,
      page = 1,
      status = "true",
      searchQuery,
      level,
      category,
      subCategory,
      language,
      topic,
      isPaid,
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
        { seoTitle: regex },
        { seoDescription: regex },
        { instructorName: regex },
        { prerequisite: regex },
        { requirements: regex },
        { highlights: regex },
      ];
    }

    if (isPaid) {
      conditions.isPaid = isPaid;
    }

    if (level) {
      conditions.level = level;
    }
    if (language) {
      conditions.language = language;
    }
    if (category) {
      conditions.category = category;
    }
    if (subCategory) {
      conditions.subCategories = subCategory;
    }
    if (topic) {
      conditions.topics = topic;
    }
    // count document
    const totalRecords = await courseModel.countDocuments(conditions);
    const totalPages = Math.ceil(totalRecords / parseInt(limit));

    const dbResponse = await courseModel
      .find(conditions)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .populate({ path: "language", select: "name _id" })
      .populate({ path: "level", select: "name _id" })
      .populate({ path: "category", select: "name _id" })
      .populate({ path: "subCategories", select: "name _id" })
      .populate({ path: "topics", select: "name _id" });

    if (!dbResponse) {
      response.errors = {
        error: constants.courseMessage.COURSE_NOT_FOUND,
      };
      response.message = constants.categoryMessage.COURSE_NOT_FOUND;
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
      `Something went wrong: Service: courseService: getAllCourses\nError: ${error.message}`
    );
    throw new Error(error);
  }
};

// deleteService
module.exports.deleteCourse = async (serviceData) => {
  try {
    const response = _.cloneDeep(constants.defaultServerResponse);
    const isCourseExist = await courseModel.findOne({
      _id: serviceData.id,
      isDeleted: true,
    });
    if (isCourseExist) {
      response.errors = {
        name: constants.courseMessage.COURSE_NOT_EXISTS,
      };
      return response;
    }

    const dbResponse = await courseModel.findOneAndUpdate(
      { _id: serviceData.id },
      { isDeleted: true },
      { new: true }
    );

    if (!dbResponse) {
      response.errors = {
        error: constants.courseMessage.COURSE_DELETED,
      };
      response.message = constants.categoryMessage.COURSE_NOT_DELETED;
      return response;
    }

    response.body = formatMongoData(dbResponse);
    response.status = 200;
    return response;
  } catch (error) {
    console.log(`Something went wrong: service : courseService : deleteCourse`);
    throw new Error(error);
  }
};

// updateCourse
module.exports.updateCourse = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const { id, body } = serviceData;
    const dbResponse = await courseModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!dbResponse) {
      response.errors = {
        error: constants.courseMessage.COURSE_NOT_UPDATED,
      };
      response.message = constants.categoryMessage.COURSE_NOT_UPDATED;
      return response;
    }
    response.body = formatMongoData(dbResponse);
    response.status = 200;
    return response;
  } catch (error) {
    console.log(
      `Something went wrong: Service : courseService : updateCourse ${error.message}`
    );
    throw new Error(error);
  }
};
