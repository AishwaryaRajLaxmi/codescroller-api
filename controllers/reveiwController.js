const constants = require("../helpers/constants");
const reviewService = require("../services/reveiwService");

// createReveiw
module.exports.createReveiw = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const reveiwResponse = await reviewService.createReview(
      req.params.userId,
      req.body
    );

    if (reveiwResponse.status === 400) {
      response.errors = reveiwResponse.errors;
    } else {
      response.body = reveiwResponse;
      response.message = constants.reviewsMessage.REVIEWS_CREATED;
      response.status = 200;
    }
  } catch (error) {
    console.log(`Something went wrong:controller:reviewsController: createReviews
    Error:${error.message}`);
    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// getAllReviews
module.exports.getAllReviews = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await reviewService.getAllReviews(req.query);
    response.body = serviceResponse.body;
    response.totalPages = serviceResponse.totalPages;
    response.totalRecords = serviceResponse.totalRecords;
    response.page = serviceResponse.page;
    response.status = 200;
    response.message = constants.reviewsMessage.REVIEWS_FETCHED;
  } catch (error) {
    console.log(`Something went wrong:controller:reviewController: getAllReviews
    Error:${error.message}`);
    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// deleteReview
module.exports.deleteReview = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await reviewService.deleteReview(req.params);
    if (serviceResponse.status == 200) {
      response.body = serviceResponse.body;
      response.message = constants.reviewsMessage.REVIEWS_DELETED;
      response.status = 200;
    } else {
      response.message = constants.reviewsMessage.REVIEWS_NOT_DELETED;
      response.status = 400;
      response.errors = serviceResponse.errors;
    }
  } catch (error) {
    console.log(`Something went wrong:controller:reviewController: deleteReviews
      Error:${error.message}`);

    response.message = error.message;
    response.errors = {
      error: error.message,
    };
  }
  res.status(response.status).send(response);
};

// getReviewById
module.exports.getReviewById = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await reviewService.getReviewById(req.params);
    response.body = serviceResponse;
    response.status = 200;
    response.message = constants.reviewsMessage.REVIEWS_FETCHED;
  } catch (error) {
    console.log(`Something went wrong:controller:ReviewController: getReviewById
    Error:${error.message}`);
    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};


// updateReview By Admin
module.exports.updateReview = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await reviewService.updateReview({
      id: req.params.id,
      body: req.body,
    });

    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = constants.reviewsMessage.REVIEWS_UPDATED;
    } else {
      response.message = constants.reviewsMessage.REVIEWS_NOT_UPDATED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: reviewController: updateReview`,
      error.message
    );

    response.errors = error;
    response.message = error.message;
    throw new Error(error);
  }
  res.status(response.status).send(response);
};

// updateReviewByUser
module.exports.updateReviewByUser = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await reviewService.updateReviewByUser({
      id: req.params.id,
      body: req.body,
    });

    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = constants.reviewsMessage.REVIEWS_UPDATED;
    } else {
      response.message = constants.reviewsMessage.REVIEWS_NOT_UPDATED;
    }
  } catch (error) {
    console.log(
      `Somthing Went Wrong Controller: reviewController: updateReviewByUser`,
      error.message
    );

    response.errors = error;
    response.message = error.message;
    throw new Error(error);
  }
  res.status(response.status).send(response);
};
