const purchasedCourseModel = require("../database/models/purchasedCourseModel");
const purchasedCourseHistoryModel = require("../database/models/purchasedCourseHistoryModel");
const constants = require("../helpers/constants");
const { formatMongoData } = require("../helpers/dbHelper");
const _ = require("lodash");

// createPurchasedCourse
module.exports.createPurchasedCourse = async (...serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const [userId, body] = serviceData;
    const purchasedCourseResponse = await purchasedCourseModel.findOne({
      user: userId.userId,
      course: body.course,
    });

    // if already purchased,just return
    if (purchasedCourseResponse) {
      response.errors = {
        user: constants.purchasedCourseMessage.PURCHASED_COURSE_ALREADY_EXISTS,
      };
      response.message =
        constants.purchasedCourseMessage.PURCHASED_COURSE_ALREADY_EXISTS;
      return response;
    }

    const newData = new purchasedCourseModel(body);
    newData.user = userId.userId;
    const dbResponse = await newData.save();
    if (dbResponse) {
      response.body = formatMongoData(dbResponse);
      response.status = 200;
    } else {
      response.errors = {
        error: constants.purchasedCourseMessage.PURCHASED_COURSE_NOT_CREATED,
      };
      response.message =
        constants.purchasedCourseMessage.PURCHASED_COURSE_NOT_CREATED;
    }

    // call purchasedCourseHistory

    const purchasedCourseHistoryData = new purchasedCourseHistoryModel(body);
    purchasedCourseHistoryData.user = userId.userId;
    purchasedCourseHistoryData.comment = "Purchased Course Successfully";
    purchasedCourseHistoryData.purchasedCourse = dbResponse._id;
    await purchasedCourseHistoryData.save();

    return response;
  } catch (error) {
    console.log(
      `Something went wrong service : purchasedCourseService : createPurchasedCourse\nError: ${error.message}`
    );
    throw new Error(error.message);
  }
};

// getPurchasedCourseById
module.exports.getPurchasedCourseByID = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse); // console.log(serviceData.userId);
  try {
    let dbResponse = await purchasedCourseModel
      .findOne({
        id: serviceData._id,
        isDeleted: false,
      })
      .populate({ path: "user", select: "name _id" })
      .populate({ path: "course", select: "name _id" });

    if (!dbResponse) {
      response.errors = {
        error: constants.purchasedCourseMessage.PURCHASED_COURSE_NOT_FOUND,
      };
      response.message =
        constants.purchasedCourseMessage.PURCHASED_COURSE_NOT_FOUND;
      return response;
    }

    response.body = formatMongoData(dbResponse);
    response.status = 200;
    return response;
  } catch (error) {
    console.log(
      `Something went wrong: service : purchasedCourseService : getPurchasedCourseByID`
    );
    throw new Error(error);
  }
};

// getMyPurchasedCourse
module.exports.getMyPurchasedCourse = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse); // console.log(serviceData.userId);
  try {
    let dbResponse = await purchasedCourseModel
      .findOne({
        user: serviceData.userId,
        isDeleted: false,
      })
      .populate({ path: "user", select: "name _id" })
      .populate({ path: "course", select: "name _id" });

    if (!dbResponse) {
      response.errors = {
        error: constants.purchasedCourseMessage.PURCHASED_COURSE_NOT_FOUND,
      };
      response.message =
        constants.purchasedCourseMessage.PURCHASED_COURSE_NOT_FOUND;
      return response;
    }

    response.body = formatMongoData(dbResponse);
    response.status = 200;
    return response;
  } catch (error) {
    console.log(
      `Something went wrong: service : purchasedCourseService : getMyPurchasedCourse`
    );
    throw new Error(error);
  }
};

// getAllPurchasedCourses
module.exports.getAllPurchasedCourses = async (serviceData) => {
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

    // console.log(conditions)
    // count document
    const totalRecords = await purchasedCourseModel.countDocuments(conditions);
    const totalPages = Math.ceil(totalRecords / parseInt(limit));

    const dbResponse = await purchasedCourseModel
      .find(conditions)
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .populate({ path: "user", select: "name _id" })
      .populate({ path: "course", select: "name _id" });

    // console.log(dbResponse)

    if (!dbResponse) {
      response.errors = {
        error: constants.purchasedCourseMessage.PURCHASED_COURSE_NOT_FOUND,
      };
      response.message =
        constants.purchasedCourseMessage.PURCHASED_COURSE_NOT_FOUND;
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
      `Something went wrong: Service: purchasedCourseService: getAllPurchasedCourses\nError: ${error.message}`
    );
    throw new Error(error);
  }
};

// deletePurchasedCourse
module.exports.deletePurchasedCourse = async (serviceData) => {
  try {
    const response = { ...constants.defaultServerResponse };

    const isPurchasedCourseExist = await purchasedCourseModel.findOne({
      _id: serviceData.id,
      isDeleted: true,
    });
    if (isPurchasedCourseExist) {
      response.errors = {
        name: constants.purchasedCourseMessage.PURCHASED_COURSE_NOT_EXISTS,
      };
      return response;
    }

    const dbResponse = await purchasedCourseModel.findOneAndUpdate(
      { _id: serviceData.id },
      { isDeleted: true },
      { new: true }
    );

    if (!dbResponse) {
      response.errors = {
        error: constants.purchasedCourseMessage.PURCHASED_COURSE_NOT_DELETED,
      };
      response.message =
        constants.purchasedCourseMessage.PURCHASED_COURSE_NOT_DELETED;
      return response;
    }

    response.body = formatMongoData(dbResponse);
    response.status = 200;
    return response;
  } catch (error) {
    console.log(
      `Something went wrong: service : purchasedCourseService : deletePurchasedCourse`
    );
    throw new Error(error);
  }
};

// updatePurchasedCourse
module.exports.updatePurchasedCourse = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const { id, body } = serviceData;
    const dbResponse = await purchasedCourseModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!dbResponse) {
      response.errors = {
        error: constants.purchasedCourseMessage.PURCHASED_COURSE_NOT_UPDATED,
      };
      response.message =
        constants.purchasedCourseMessage.PURCHASED_COURSE_NOT_UPDATED;
      return response;
    }
    response.body = formatMongoData(dbResponse);
    response.status = 200;
    return response;
  } catch (error) {
    console.log(
      `Something went wrong: Service : purchasedCourseService : updatePurchasedCourse ${error.message}`
    );
    throw new Error(error);
  }
};
