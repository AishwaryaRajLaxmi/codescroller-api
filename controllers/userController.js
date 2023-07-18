const userService = require("../services/userServices");
const constants = require("../helpers/constants");

// registerUser
module.exports.registerUser = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await userService.registerUser(req.body);
    console.log(serviceResponse);
    
    if (serviceResponse.status === 400) {
      response.errors = serviceResponse.errors;
     
    } else {
      response.body = serviceResponse;
      response.message = constants.UserMessage.USER_REGISTERED;
    
    }
  } catch (error) {
    console.log(
      `Something went wrong controller : userController :registerUser \nError: ${error.message}`
    );

    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// loginUser
module.exports.loginUser = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  console.log(req.body);

  try {
    const serviceResponse = await userService.loginUser(req.body);
    response.body = serviceResponse;
    response.message = constants.UserMessage.USER_LOGEDIN;
    response.status = 200;
  } catch (error) {
    console.log(`Something went wrong: controlelr :loginController:loginUser`);
    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// isEmailExists
module.exports.isEmailExists = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await userService.isEmailExists(req.params);
    response.status = 200;
    response.body = serviceResponse;
    if (response.body) {
      response.message = constants.UserMessage.USER_FOUND;
    } else {
      response.message = constants.UserMessage.USER_NOT_FOUND;
    }
  } catch (error) {
    console.log(
      `Something went wrong: controller :userController:isEmailExists`
    );
    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// isMobileExists
module.exports.isMobileExists = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await userService.isMobileExists(req.params);
    response.status = 200;
    response.body = serviceResponse;
    if (response.body) {
      response.message = constants.UserMessage.USER_FOUND;
    } else {
      response.message = constants.UserMessage.USER_NOT_FOUND;
    }
  } catch (error) {
    console.log(
      `Something went wrong: controller :userController:isMobileExists`
    );
    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// getAllUsers
module.exports.getAllUsers = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await userService.getAllUsers(req.query);
    response.body = serviceResponse.body;
    response.totalPages = serviceResponse.totalPages;
    response.totalRecords = serviceResponse.totalRecords;
    response.currentPage = serviceResponse.currentPage;
    response.status = 200;
    response.message = constants.UserMessage.USER_FETCHED;
  } catch (error) {
    console.log(`Something went wrong:controller:userController: getAllUsers 
    Error:${error.message}`);

    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// deleteUser
module.exports.deleteUser = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await userService.deleteUser(req.params);
    if (serviceResponse.status == 200) {
      response.body = serviceResponse.body;
      response.message = constants.UserMessage.USER_DELETED;
      response.status = 200;
    } else {
      response.message = constants.UserMessage.USER_NOT_DELETED;
      response.status = 400;
      response.errors = serviceResponse.errors;
    }
  } catch (error) {
    console.log(`Something went wrong:controller:userController: getAllUsers 
      Error:${error.message}`);

    response.message = error.message;
    response.errors = {
      error: error.message,
    };
  }
  res.status(response.status).send(response);
};

// getUser
module.exports.getUserById = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await userService.getUserById(req.params);
    response.body = serviceResponse;
    response.status = 200;
    response.message = constants.UserMessage.USER_FETCHED;
  } catch (error) {
    console.log(`Something went wrong:controller:userController: getUserById
    Error:${error.message}`);
    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// updateUser
module.exports.updateUser = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await userService.updateUser({
      id: req.params.id,
      body: req.body,
    });

    if (serviceResponse) {
      response.body = serviceResponse;
      response.status = 200;
      response.message = constants.UserMessage.USER_UPDATED;
    } else {
      response.message = constants.UserMessage.USER_NOT_UPDATED;
    }
  } catch (error) {
    console.log(
      `Something went wrong: Controller : userController : updateController ${error.message}`
    );

    response.errors = error;
    response.message = error.message;
  }
  res.status(response.status).send(response);
};
