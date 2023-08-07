const purchasedCourseHistoryModel = require("../database/models/purchasedCourseHistoryModel");
const constants = require("../helpers/constants");
const { formatMongoData } = require("../helpers/dbHelper");
const _ = require("lodash");

module.exports.getAllPurchasedCoursesHistory = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const {
      limit = 10,
      page = 1,
      status = "true",
      courseStatus = "purchased",
      searchQuery,
      course,
      courseMrp,
      couponName,
      courseSellingPrice,
      user,
    } = serviceData;
    let conditions = {};
    conditions.isDeleted = false;

    if (status == "true" || status == "false") {
      conditions.status = status;
    }

    if (courseStatus == "purchased" || courseStatus == "returned") {
      conditions.courseStatus = courseStatus;
    }
    // search query
    if (searchQuery) {
      const regex = new RegExp(searchQuery, "i");
      conditions.$or = [{ courseName: regex }, { couponName: regex }];
    }

    if (course) {
      conditions.course = course;
    }
    if (courseSellingPrice) {
      conditions.courseSellingPrice = courseSellingPrice;
    }
    if (user) {
      conditions.user = user;
    }
    if (courseMrp) {
      conditions.courseMrp = courseMrp;
    }
    if (couponName) {
      conditions.couponName = couponName;
    }

    // count document
    const totalRecords = await purchasedCourseHistoryModel.countDocuments(
      conditions
    );
    const totalPages = Math.ceil(totalRecords / parseInt(limit));

    const dbResponse = await purchasedCourseHistoryModel
      .find(conditions)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .populate({ path: "user", select: "name _id" })
      .populate({ path: "course", select: "name _id" });

    if (!dbResponse) {
      response.errors = {
        error:
          constants.purchasedCourseHistoryMessage
            .PURCHASED_COURSE_HISTORY_NOT_FETCHED,
      };
      response.message =
        constants.purchasedCourseHistoryMessage.PURCHASED_COURSE_HISTORY_NOT_FETCHED;
      return response;
    }
    response.status = 200;
    const formatData = formatMongoData(dbResponse);

    return {
      body: formatData,
      totalPages,
      totalRecords,
      page,
    };
  } catch (error) {
    console.log(
      `Something went wrong: Service: purchasedCourseService: getAllPurchasedCoursesHistory\nError: ${error.message}`
    );
    throw new Error(error);
  }
};

module.exports.getPurchasedCourseHistoryById = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    let dbResponse = await purchasedCourseHistoryModel
      .findOne({
        id: serviceData._id,
        isDeleted: false,
      })
      .populate({ path: "user", select: "name _id" })
      .populate({ path: "course", select: "name _id" });

    if (!dbResponse) {
      response.errors = {
        error:
          constants.purchasedCourseHistoryMessage
            .PURCHASED_COURSE_HISTORY_FETCHED,
      };
      response.message =
        constants.purchasedCourseHistoryMessage.PURCHASED_COURSE_HISTORY_NOT_FOUND;
      return response;
    }

    // find lesson and add
    response.body = formatMongoData(dbResponse);
    response.status = 200;
    return response;
  } catch (error) {
    console.log(
      `Something went wrong: service : purchasedCourseService : getPurchasedCourseHistoryById`
    );
    throw new Error(error);
  }
};
