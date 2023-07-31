const lessonModel = require("../database/models/lessonModel");
const constants = require("../helpers/constants");
const { formatMongoData } = require("../helpers/dbHelper");

// createContent
module.exports.createLessonContent = async (lessonId,body) => {
 
  const response = { ...constants.defaultServerResponse };
  console.log(lessonId,body);
  
  try {
    const lessonResponse = await lessonModel.findOne({
      _id: lessonId,
    });

    if (lessonResponse) {
      lessonResponse.contents.push(body);
    }
  
    
    const serviceResponse = await lessonResponse.save();
   

    return serviceResponse.body={
      message:"content added"
    };
  } catch (error) {
    console.log(
      `Something went wrong service : lessonContentService : createlessonContent\nError: ${error.message}`
    );
    throw new Error(error.message);
  }
};

// // getContentById
// module.exports.getContentById = async (serviceData) => {
//   try {
//     const serviceResponse = await lessonModel
//       .findOne({
//         _id: serviceData.id,
//         isDeleted: false,
//       })
//       .populate({ path: "course", select: "name _id" });

//     const formatData = formatMongoData(serviceResponse);
//     return formatData;
//   } catch (error) {
//     console.log(
//       `Something went wrong: service : contentService : gegetContentById`
//     );
//     throw new Error(error);
//   }
// };

// // getAllcontent
// module.exports.getAllContents = async (serviceData) => {
//   try {
//     const {
//       limit = 10,
//       page = 1,
//       status = "true",
//       searchQuery,
//       course,
//       serialNo
//     } = serviceData;
//     let conditions = {};
//     conditions.isDeleted = false;

//     if (status == "true" || status == "false") {
//       conditions.status = status;
//     }

//     // search query
//     if (searchQuery) {
//       const regex = new RegExp(searchQuery, "i");
//       conditions.$or = [
//         { name: regex },
//         { description: regex },
//         { slug: regex },
//       ];
//     }

//     if (serialNo) {
//       conditions.serialNo = serialNo;
//     }
//     if (course) {
//       conditions.course = course;
//     }
//     // count document
//     const totalRecords = await lessonModel.countDocuments(conditions);
//     const totalPages = Math.ceil(totalRecords / parseInt(limit));

//     const serviceResponse = await lessonModel
//       .find(conditions)
//       .skip((parseInt(page) - 1) * parseInt(limit))
//       .limit(parseInt(limit))
//       .populate({ path: "course", select: "name _id" });

//     const formatData = formatMongoData(serviceResponse);

//     return {
//       body: formatData,
//       totalPages,
//       totalRecords,
//       page,
//     };
//   } catch (error) {
//     console.log(
//       `Something went wrong: Service: contentService: getAllcontents\nError: ${error.message}`
//     );
//     throw new Error(error);
//   }
// };

// // deleteService
// module.exports.deleteContent = async (serviceData) => {
//   try {
//     const response = { ...constants.defaultServerResponse };

//     const serviceResponse = await lessonModel.findOneAndUpdate(
//       { _id: serviceData.id },
//       { isDeleted: true },
//       { new: true }
//     );

//     if (!serviceResponse) {
//       response.errors = {
//         error: constants.contentMessage.content_DELETED,
//       };
//       return response;
//     }

//     response.body = serviceResponse;
//     response.status = 200;

//     return response;
//   } catch (error) {
//     console.log(`Something went wrong: service : contentService : deletecontent`);
//     throw new Error(error);
//   }
// };

// // updateContent
// module.exports.updateContent = async (serviceData) => {
//   try {
//     const { id, body } = serviceData;
//     const serviceResponse = await lessonModel.findByIdAndUpdate(id, body, {
//       new: true,
//     });
//     return formatMongoData(serviceResponse);
//   } catch (error) {
//     console.log(
//       `Something went wrong: Service : contentService : updatecontent ${error.message}`
//     );
//     throw new Error(error);
//   }
// };
