const courseModel = require("../database/models/courseModel");
const constants = require("../helpers/constants");
const { formatMongoData } = require("../helpers/dbHelper");

// createCourse
module.exports.createCourse = async (serviceData) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const courseResponse = await courseModel.findOne({
      name: serviceData.name,
    });

    if (courseResponse) {
      response.errors = {
        name: "course already exists",
      };

      return response;
    }

    const newData = new courseModel(serviceData);
    const serviceResponse = await newData.save();
    return serviceResponse;
  } catch (error) {
    console.log(
      `Something went wrong service : courseService : createCourse\nError: ${error.message}`
    );
    throw new Error(error.message);
  }
};

// getCourseById
module.exports.getCourseById = async (serviceData) => {
  try {
    const serviceResponse = await courseModel.findOne({
      _id: serviceData.id,
      isDeleted: false,
    });
    const formatData = formatMongoData(serviceResponse);
    return formatData;
  } catch (error) {
    console.log(
      `Something went wrong: service : courseService : getLanguageById`
    );
    throw new Error(error);
  }
};

// getAllCourse
module.exports.getAllCourses = async (serviceData) => {
  try {
    const { limit = 10, page = 1, status = "true", searchQuery } = serviceData;
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
    // count document
    const totalRecords = await courseModel.countDocuments(conditions);
    const totalPages = Math.ceil(totalRecords / parseInt(limit));

    const serviceResponse = await courseModel
      .find(conditions)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .populate({ path: "language", select: "name _id" })
      .populate({ path: "level", select: "name _id" });

    const formatData = formatMongoData(serviceResponse);

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
    const response = { ...constants.defaultServerResponse };

    const serviceResponse = await courseModel.findOneAndUpdate(
      { _id: serviceData.id },
      { isDeleted: true },
      { new: true }
    );

    if (!serviceResponse) {
      response.errors = {
        error: constants.courseMessage.COURSE_DELETED,
      };
      return response;
    }

    response.body = serviceResponse;
    response.status = 200;

    return response;
  } catch (error) {
    console.log(`Something went wrong: service : courseService : deleteCourse`);
    throw new Error(error);
  }
};

// updateCourse
module.exports.updateCourse = async (serviceData) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const { id, body } = serviceData;
    const serviceResponse = await courseModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return formatMongoData(serviceResponse);
  } catch (error) {
    console.log(
      `Something went wrong: Service : courseService : updateCourse ${error.message}`
    );
    throw new Error(error);
  }
};
