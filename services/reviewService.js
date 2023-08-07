const reviewModel = require("../database/models/reviewModel");
const { formatMongoData } = require("../helpers/dbHelper");
const constants = require("../helpers/constants");
const _ = require("lodash");

// createReview
module.exports.createReview = async (userId, body) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const reveiwResponse = await reviewModel.findOne({
      user: userId,
      course: body.course,
    });

    if (reveiwResponse) {
      response.errors = {
        course: "Sorry, You Already reviewed this course",
      };
      response.message = "This course has already been reviewed";
      return response;
    }

    body.user = userId;

    const newData = new reviewModel(body);
    const dbResponse = await newData.save();
    if (dbResponse) {
      response.body = formatMongoData(dbResponse);
      response.status = 200;
    } else {
      response.errors = {
        error: constants.reviewsMessage.REVIEWS_NOT_CREATED,
      };
      response.message = constants.reviewsMessage.REVIEWS_NOT_CREATED;
    }
    return response;
  } catch (error) {
    console.log(
      `Something went wrong service : reviewService : createReview\nError: ${error.message}`
    );
    throw new Error(error.message);
  }
};

// getAllReviews
module.exports.getAllReviews = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
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

      conditions.$or = [{ comment: regex }];
    }

    // count document
    const totalRecords = await reviewModel.countDocuments(conditions);
    const totalPages = Math.ceil(totalRecords / parseInt(limit));

    const dbResponse = await reviewModel
      .find(conditions)
      .skip(parseInt(page - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .populate({ path: "course", select: "name _id" })
      .populate({ path: "user", select: "name _id" });

    if (!dbResponse) {
      response.errors = {
        error: constants.reviewsMessage.REVIEWS_NOT_FOUND,
      };
      response.message = constants.reviewsMessage.REVIEWS_NOT_FOUND;
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
      `Something went wrong: Service: reviewService: getAllReviews\nError: ${error.message}`
    );
    throw new Error(error);
  }
};

// getReviewById
module.exports.getReviewById = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const dbResponse = await reviewModel
      .findOne({
        _id: serviceData.id,
        isDeleted: false,
      })
      .populate({ path: "course", select: "name _id" })
      .populate({ path: "user", select: "name _id" });

    if (!dbResponse) {
      response.errors = {
        error: constants.reviewsMessage.REVIEWS_NOT_FOUND,
      };
      response.message = constants.reviewsMessage.REVIEWS_NOT_FOUND;
      return response;
    }
    response.body = formatMongoData(dbResponse);
    response.status = 200;
    return response;
  } catch (error) {
    console.log(
      `Something went wrong: service : ReviewService : getReviewById`
    );
    throw new Error(error);
  }
};

// updateReview By Admin
module.exports.updateReview = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const { id, body } = serviceData;
    const dbResponse = await reviewModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!dbResponse) {
      response.errors = {
        error: constants.reviewsMessage.REVIEWS_NOT_UPDATED,
      };
      response.message = constants.reviewsMessage.REVIEWS_NOT_UPDATED;
      return response;
    }
    response.body = formatMongoData(dbResponse);
    response.status = 200;
  } catch (error) {
    console.log(
      `Something went wrong: Service : reviewService : updateReview ${error.message}`
    );
    throw new Error(error);
  }
};

// updateReview By User
module.exports.updateReviewByUser = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const { id, body } = serviceData;
    const dbResponse = await reviewModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!dbResponse) {
      response.errors = {
        error: constants.reviewsMessage.REVIEWS_NOT_UPDATED,
      };
      response.message = constants.reviewsMessage.REVIEWS_NOT_UPDATED;
      return response;
    }
    response.body = formatMongoData(dbResponse);
    response.status = 200;
  } catch (error) {
    console.log(
      `Something went wrong: Service : reviewService : updateReviewByUser ${error.message}`
    );
    throw new Error(error);
  }
};

// deleteReview
module.exports.deleteReview = async (serviceData) => {
  try {
    const response = _.cloneDeep(constants.defaultServerResponse);
    const isReviewExist = await reviewModel.findOne({
      _id: serviceData.id,
      isDeleted: true,
    });
    if (isReviewExist) {
      response.errors = {
        name: constants.reviewsMessage.REVIEWS_NOT_EXISTS,
      };
      return response;
    }

    const dbResponse = await reviewModel.findOneAndUpdate(
      { _id: serviceData.id },
      { isDeleted: true },
      { new: true }
    );

    if (!dbResponse) {
      response.errors = {
        error: constants.reviewsMessage.REVIEWS_NOT_DELETED,
      };
      return response;
    }

    response.body = formatMongoData(dbResponse);
    response.status = 200;

    return response;
  } catch (error) {
    console.log(`Something went wrong: service : reviewService : deleteReview`);
    throw new Error(error);
  }
};
