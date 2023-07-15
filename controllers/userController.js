const userService = require("../services/userServices");
const constants = require("../helpers/constants");

// registerUser
module.exports.registerUser = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse = await userService.registerUser(req.body);
    response.body = serviceResponse;
    response.message = constants.UserMessage.USER_REGISTERED;
    response.status = 200;
  } catch (error) {
    
    console.log(
      `Something went wrong controller : userController :registerUser \nError: ${error.message}`
    );

    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};

// getAllUser
module.exports.getAllUser = async (req, res) => {
  const response = { ...constants.defaultServerResponse };
  try {
    const serviceResponse =await userService.getAllUser(req.query);
    console.log(serviceResponse);
    
    response.body = serviceResponse;
    response.status = 200;
    response.message = constants.UserMessage.USER_FETCHED;
  } catch (error) {
    console.log(`Something went wrong:controller:userController: getAllUser 
    Error:${error.message}`);

    response.message = error.message;
    response.errors = error;
  }
  res.status(response.status).send(response);
};


// deleteUser
module.exports.deleteUser=async(req,res)=>{
  try{

  }catch(error){

  }
}


// getUser
// module.exports.getUser=asyn