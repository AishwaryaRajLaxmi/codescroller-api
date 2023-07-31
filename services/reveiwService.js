const reveiwModel = require("../database/models/reveiwModel");
const { formatMongoData } = require("../helpers/dbHelper");
const constants = require("../helpers/constants");

// createReveiw
module.exports.createReview = async (userId, body) => {
  const response = { ...constants.defaultServerResponse };

  try {
    const reveiwResponse = await reveiwModel.findOne({
      user: userId,
      Review: body.Review,
    });

    if (reveiwResponse) {
      response.errors = {
        course: "Sorry, You Already reviewed this course",
      };
      return response;
    }

    body.user = userId;

    const newData = new reveiwModel(body);
    const serviceResponse = await newData.save();
    return serviceResponse;
  } catch (error) {
    console.log(
      `Something went wrong service : reviewService : createReview\nError: ${error.message}`
    );
    throw new Error(error.message);
  }
};

// getAllReviews
module.exports.getAllReviews = async (serviceData) => {
  try {
    const { limit = 10, page = 1, status = "true", searchQuery } = serviceData;
    let conditions = {};

    if (status == "true" || status == "false") {
      conditions.status = status;
    }

    // search query
    if (searchQuery) {
      const regex = new RegExp(searchQuery, "i");

      conditions.$or = [{ comment: regex }];
    }

    // count document
    const totalRecords = await reveiwModel.countDocuments(conditions);
    const totalPages = Math.ceil(totalRecords / parseInt(limit));

    const serviceResponse = await reveiwModel
      .find(conditions)
      .skip(parseInt(page - 1) * parseInt(limit))
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
      `Something went wrong: Service: reviewService: getAllReviews\nError: ${error.message}`
    );
    throw new Error(error);
  }
};

// deleteReview
module.exports.deleteReview = async (serviceData) => {
  try {
    const response = { ...constants.defaultServerResponse };

    const serviceResponse = await reveiwModel.findOneAndUpdate(
      { _id: serviceData.id },
      { isDeleted: true },
      { new: true }
    );

    if (!serviceResponse) {
      response.errors = {
        error: constants.reviewsMessage.REVIEWS_DELETED,
      };
      return response;
    }

    response.body = serviceResponse;
    response.status = 200;

    return response;
  } catch (error) {
    console.log(`Something went wrong: service : reviewService : deleteReview`);
    throw new Error(error);
  }
};

// getReviewById
module.exports.getReviewById = async (serviceData) => {
  try {
    const serviceResponse = await reveiwModel.findOne({
      _id: serviceData.id,
      isDeleted: false,
    });

    // console.log(serviceResponse);

    const formatData = formatMongoData(serviceResponse);
    return formatData;
  } catch (error) {
    console.log(
      `Something went wrong: service : ReviewService : getReviewById`
    );
    throw new Error(error);
  }
};

// updateReview By Admin
module.exports.updateReview = async (serviceData) => {
  try {
    const { id, body } = serviceData;
    const serviceResponse = await reveiwModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return formatMongoData(serviceResponse);
  } catch (error) {
    console.log(
      `Something went wrong: Service : reviewService : updateReview ${error.message}`
    );
    throw new Error(error);
  }
};

// updateReviw By Admin
module.exports.updateReviewByUser = async (serviceData) => {
  try {
    const { id, body } = serviceData;
    const serviceResponse = await reveiwModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return formatMongoData(serviceResponse);
  } catch (error) {
    console.log(
      `Something went wrong: Service : reviewService : updateReviewByUser ${error.message}`
    );
    throw new Error(error);
  }
};
