const mainSliderModel = require("../database/models/mainSliderModel");
const constants = require("../helpers/constants");
const { formatMongoData } = require("../helpers/dbHelper");
const _ = require("lodash");

// createMainSlider
module.exports.createMainSlider = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  console.log(serviceData.name);
  try {
    const mainSliderResponse = await mainSliderModel.findOne({
      title: serviceData.title,
    });

    console.log(mainSliderResponse);
    if (mainSliderResponse) {
      response.errors = {
        name: constants.mainSliderMessage.MAIN_SLIDER_ALREADY_EXISTS,
      };
      response.message = constants.mainSliderMessage.MAIN_SLIDER_ALREADY_EXISTS;
      return response;
    }

    const newData = new mainSliderModel(serviceData);
    const dbResponse = await newData.save();
    if (dbResponse) {
      response.body = formatMongoData(dbResponse);
      response.status = 200;
    } else {
      response.errors = {
        error: constants.mainSliderMessage.MAIN_SLIDER_NOT_CREATED,
      };
      response.message = constants.mainSliderMessage.MAIN_SLIDER_NOT_CREATED;
    }
    return response;
  } catch (error) {
    console.log(
      `Something went wrong service: mainSliderService: createMainSlider\nError: ${error.message}`
    );
    throw new Error(error.message);
  }
};

// getMainSliderById
module.exports.getMainSliderById = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const dbResponse = await mainSliderModel.findById(serviceData.id);

    if (!dbResponse) {
      response.errors = {
        error: constants.mainSliderMessage.MAIN_SLIDER_NOT_FOUND,
      };
      response.message = constants.mainSliderMessage.MAIN_SLIDER_NOT_FOUND;
      return response;
    }

    response.body = formatMongoData(dbResponse);
    response.status = 200;
    return response;
  } catch (error) {
    console.log(
      `Something went wrong: service: mainSliderService: getMainSliderById`
    );
    throw new Error(error);
  }
};

// getAllMainSliders
module.exports.getAllMainSliders = async () => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const dbResponse = await mainSliderModel.find({});

    if (!dbResponse) {
      response.errors = {
        error: constants.mainSliderMessage.MAIN_SLIDER_NOT_FOUND,
      };
      response.message = constants.mainSliderMessage.MAIN_SLIDER_NOT_FOUND;
      return response;
    }

    const formatData = formatMongoData(dbResponse);
    response.status = 200;
    response.body = formatData;
    return response;
  } catch (error) {
    console.log(
      `Something went wrong: Service: mainSliderService: getAllMainSliders\nError: ${error.message}`
    );
    throw new Error(error);
  }
};

// deleteMainSlider
module.exports.deleteMainSlider = async (serviceData) => {
  try {
    const response = _.cloneDeep(constants.defaultServerResponse);
    const isMainSliderExist = await mainSliderModel.findById(serviceData.id);

    if (!isMainSliderExist) {
      response.errors = {
        name: constants.mainSliderMessage.MAIN_SLIDER_NOT_EXISTS,
      };
      return response;
    }

    const dbResponse = await mainSliderModel.findByIdAndDelete(serviceData.id);

    if (!dbResponse) {
      response.errors = {
        error: constants.mainSliderMessage.MAIN_SLIDER_NOT_DELETED,
      };
      response.message = constants.mainSliderMessage.MAIN_SLIDER_NOT_DELETED;
      return response;
    }

    response.body = formatMongoData(dbResponse);
    response.status = 200;
    return response;
  } catch (error) {
    console.log(
      `Something went wrong: service: mainSliderService: deleteMainSlider`
    );
    throw new Error(error);
  }
};

// updateMainSlider
module.exports.updateMainSlider = async (serviceData) => {
  const response = _.cloneDeep(constants.defaultServerResponse);
  try {
    const { id, body } = serviceData;
    const dbResponse = await mainSliderModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!dbResponse) {
      response.errors = {
        error: constants.mainSliderMessage.MAIN_SLIDER_NOT_UPDATED,
      };
      response.message = constants.mainSliderMessage.MAIN_SLIDER_NOT_UPDATED;
      return response;
    }
    response.body = formatMongoData(dbResponse);
    response.status = 200;
    return response;
  } catch (error) {
    console.log(
      `Something went wrong: Service: mainSliderService: updateMainSlider ${error.message}`
    );
    throw new Error(error);
  }
};
