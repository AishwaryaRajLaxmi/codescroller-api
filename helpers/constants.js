module.exports = {
  defaultServerResponse: {
    message: "",
    body: null,
    errors: {},
    status: 400,
  },
  validationMessage: {
    VALIDATION_FAILED: "Validation Failed",
    TOKEN_MISSING: "Token is Missing, Login First",
  },

  authMessage: {
    EMAIL_EXISTS: "Email already Exists!",
    NEED_VERIFICATION: "Account Exists, Need Verification",
    NEED_LOGIN: "Account Exists, Need Login",
    ACCOUNT_DISABLED: "Sorry Your Account is Disabled",
    ACCOUNT_NOT_VERIFIED: "Your Account is Not Verified, Verify First",
    INVALID_EMAIL: "Invalid Email!",
    OTP_FAILED: "OTP Failed",
    OTP_SUCCESS: "OTP Send Successfully !",
    INVALID_PASSWORD: "Password is Wrong!",
    LOGIN_SUCCESS: "Successfully Logedin",
    LOGIN_FAILED: "Login Failed !",
    REGISTRATION_SUCCESS: "Registration Successfully !",
    REGISTRATION_FAILED: "Registration Failed !",
    ACCOUNT_VALIDATED: "Account Validated Successfully !",
    PASSWORD_UPDATED: "Password Updated Successfully !",
    PASSWORD_NOT_UPDATED: "Password Not Updated!",
    PASSWORD_MISMATCHED: "You have entered wrong password!",
  },

  adminMessage: {
    CUSTOMER_CREATED: "Admin Register Successfully!",
    PASSWORD_UPDATED: "Password Updated Successfully!",
    PASSWORD_NOT_UPDATED: "OOPS ! Password Not Updated !",
    OLD_PASSWORD_NOT_MATCHED: "OOPS ! Old Password is not Matched !",
    PROFILE_NOT_UPDATED: "OOPS ! Profile Not Updated !",
    PROFILE_UPDATED: "Profile Updated Successfully !",
    PROFILE_FETCHED: "Profile Fetched Successfully !",
    ACCOUNT_FOUND: "Account Found Successfully !",
    ACCOUNT_NOT_FOUND: "Account Not Found !",
    PROFILE_NOT_FETCHED: "OOPS ! Profile Not Fetched !",
  },

  userMessage: {
    USER_REGISTERED: "User Registered Successfully",
    USER_NOT_REGISTERED: "User Not Registered ",
    USER_FETCHED: "User Fetched Successfully",
    USER_NOT_FETCHED: "User Fetched Successfully",
    USER_LOGEDIN: "User Logedin Successfully",
    USER_NOT_LOGEDIN: "User Not Logedin",
    USER_UPDATED: "User Updated Successfully",
    USER_NOT_UPDATED: "User Not Updated",
    USER_DELETED: "User Deleted Successfully",
    USER_NOT_DELETED: "User Not Deleted",
    USER_NOT_FOUND: "User Not Found",
    USER_FOUND: "User Found",
    USER_ALREADY_EXISTS: "User Already Exists",
    USER_NOT_EXISTS: "User Not Exists",
  },
  categoryMessage: {
    CATEGORY_CREATED: "Category Created Successfully",
    CATEGORY_NOT_CREATED: "Category Not Created",
    CATEGORY_FETCHED: "Category Fetched Successfully",
    CATEGORY_NOT_FETCHED: "Category Not Fetched ",
    CATEGORY_LOGEDIN: "Category Logedin Successfully",
    CATEGORY_NOT_LOGEDIN: "Category Not Logedin",
    CATEGORY_UPDATED: "Category Updated Successfully",
    CATEGORY_NOT_UPDATED: "Category Not Updated ",
    CATEGORY_DELETED: "Category Deleted Successfully",
    CATEGORY_NOT_DELETED: "Category Not Deleted",
    CATEGORY_NOT_FOUND: "Category Not Found",
    CATEGORY_ALREADY_EXISTS: "Category Already Exists",
    CATEGORY_NOT_EXISTS: "Category Not Exists",
  },
  subCategoryMessage: {
    SUB_CATEGORY_CREATED: "Subcategory Created Successfully",
    SUB_CATEGORY_NOT_CREATED: "Subcategory Not Created",
    SUB_CATEGORY_FETCHED: "Subcategory Fetched Successfully",
    SUB_CATEGORY_NOT_FETCHED: "Subcategory Not Fetched",
    SUB_CATEGORY_LOGEDIN: "Subcategory Logedin Successfully",
    SUB_CATEGORY_NOT_LOGEDIN: "Subcategory Not Logedin",
    SUB_CATEGORY_UPDATED: "Subcategory Updated Successfully",
    SUB_CATEGORY_NOT_UPDATED: "Subcategory Not Updated",
    SUB_CATEGORY_DELETED: "Subcategory Deleted Successfully",
    SUB_CATEGORY_NOT_DELETED: "Subcategory Not Deleted",
    SUB_CATEGORY_NOT_FOUND: "Subcategory Not Found",
    SUB_CATEGORY_ALREADY_EXISTS: "Subcategory Already Exists",
    SUB_CATEGORY_NOT_EXISTS: "Subcategory Not Exists",
  },
  languageMessage: {
    LANGUAGE_CREATED: "Language Created Successfully",
    LANGUAGE_NOT_CREATED: "Language Not Created",
    LANGUAGEL_FETCHED: "Language Fetched Successfully",
    LANGUAGE_NOT_FETCHED: "Language Not Fetched",
    LANGUAGE_LOGEDIN: "Language Logedin Successfully",
    LANGUAGE_NOT_LOGEDIN: "Language Not Logedin",
    LANGUAGE_UPDATED: "Language Updated Successfully",
    LANGUAGE_NOT_UPDATED: "Language Not Updated ",
    LANGUAGE_DELETED: "Language Deleted Successfully",
    LANGUAGE_NOT_DELETED: "Language Not Deleted",
    LANGUAGE_NOT_FOUND: "Language Not Found",
    LANGUAGE_ALREADY_EXISTS: "Language Already Exists",
    LANGUAGE_NOT_EXISTS: "Language Not Exists",
  },
  levelMessage: {
    LEVEL_CREATED: "level Created Successfully",
    LEVEL_NOT_CREATED: "level Not Created",
    LEVEL_FETCHED: "level Fetched Successfully",
    LEVEL_NOT_FETCHED: "Level Not Fetched",
    LEVEL_LOGEDIN: "Level Logedin Successfully",
    LEVEL_NOT_LOGEDIN: "Level Not Logedin",
    LEVEL_UPDATED: "Level Updated Successfully",
    LEVEL_NOT_UPDATED: "Level Not Updated ",
    LEVEL_DELETED: "Level Deleted Successfully",
    LEVEL_NOT_DELETED: "Level Not Deleted",
    LEVEL_NOT_FOUND: "Level Not Found",
    LEVEL_ALREADY_EXISTS: "Level Already Exists",
    LEVEL_NOT_EXISTS: "Level Not Exists",
  },
  courseMessage: {
    COURSE_CREATED: "Course Created Successfully",
    COURSE_NOT_CREATED: "Course Not Created ",
    COURSE_FETCHED: "Course Fetched Successfully",
    COURSE_NOT_FETCHED: "Course Not Fetched",
    COURSE_UPDATED: "Course Updated Successfully",
    COURSE_NOT_UPDATED: "Course Not Updated",
    COURSE_DELETED: "Course Deleted Successfully",
    COURSE_NOT_DELETED: "Course Not Deleted",
    COURSE_NOT_FOUND: "Course Not Found",
    COURSE_ALREADY_EXISTS: "Course Already Exists",
    COURSE_NOT_EXISTS: "Course Not Exists",
  },
  purchasedCourseMessage: {
    PURCHASED_COURSE_CREATED: "Purchased Course Created Successfully",
    PURCHASED_COURSE_NOT_CREATED: "Purchased Course Not Created",
    PURCHASED_COURSE_FETCHED: "Purchased Course Fetched Successfully",
    PURCHASED_COURSE_NOT_FETCHED: "Purchased Course Not Fetched",
    PURCHASED_COURSE_UPDATED: "Purchased Course Updated Successfully",
    PURCHASED_COURSE_NOT_UPDATED: "Purchased Course Not Updated",
    PURCHASED_COURSE_DELETED: "Purchased Course Deleted Successfully",
    PURCHASED_COURSE_NOT_DELETED: "Purchased Course Not Deleted",
    PURCHASED_COURSE_NOT_FOUND: "Purchased Course Not Found",
    PURCHASED_COURSE_ALREADY_EXISTS: "This   Course is Already Purchased ",
    PURCHASED_COURSE_NOT_EXISTS: "Purchased Course Not Exists",
  },
  purchasedCourseHistoryMessage: {
    PURCHASED_COURSE_HISTORY_CREATED:
      "Purchased Course History Created Successfully",
    PURCHASED_COURSE_HISTORY_NOT_CREATED:
      "Purchased Course History Not Created",
    PURCHASED_COURSE_HISTORY_FETCHED:
      "Purchased Course History Fetched Successfully",
    PURCHASED_COURSE_HISTORY_NOT_FETCHED:
      "Purchased Course History Not Fetched",
    PURCHASED_COURSE_HISTORY_UPDATED:
      "Purchased Course History Updated Successfully",
    PURCHASED_COURSE_HISTORY_NOT_UPDATED:
      "Purchased Course History Not Updated",
    PURCHASED_COURSE_HISTORY_DELETED:
      "Purchased Course History Deleted Successfully",
    PURCHASED_COURSE_HISTORY_NOT_DELETED:
      "Purchased Course History Not Deleted",
    PURCHASED_COURSE_HISTORY_NOT_FOUND: "Purchased Course History Not Found",
    PURCHASED_COURSE_HISTORY_ALREADY_EXISTS:
      "Purchased Course History Already Exists",
    PURCHASED_COURSE_HISTORY_NOT_EXISTS: "Purchased Course History Not Exists",
  },
  lessonMessage: {
    LESSON_CREATED: "Lesson Created Successfully",
    LESSON_NOT_CREATED: "Lesson Not Created ",
    LESSON_FETCHED: "Lesson Fetched Successfully",
    LESSON_NOT_FETCHED: "Lesson Not Fetched",
    LESSON_UPDATED: "Lesson Updated Successfully",
    LESSON_NOT_UPDATED: "Lesson Not Updated",
    LESSON_DELETED: "Lesson Deleted Successfully",
    LESSON_NOT_DELETED: "Lesson Not Deleted",
    LESSON_NOT_FOUND: "Lesson Not Found",
    LESSON_FOUND: "Lesson Found",
    LESSON_ALREADY_EXISTS: "Lesson Already Exists",
    LESSON_NOT_EXISTS: "Lesson Not Exists",
  },
  contentMessage: {
    CONTENT_CREATED: "Content Created Successfully",
    CONTENT_NOT_CREATED: "Content Not Created ",
    CONTENT_FETCHED: "Content Fetched Successfully",
    CONTENT_NOT_FETCHED: "Content Not Fetched",
    CONTENT_UPDATED: "Content Updated Successfully",
    CONTENT_NOT_UPDATED: "Content Not Updated",
    CONTENT_DELETED: "Content Deleted Successfully",
    CONTENT_NOT_DELETED: "Content Not Deleted",
    CONTENT_NOT_FOUND: "Content Not Found",
    CONTENT_FOUND: "Content Found",
    CONETENT_ALREADY_EXISTS: "Content Already Exists",
    CONETENT_NOT_EXISTS: "Content NOT Exists",
  },
  topicMessage: {
    TOPIC_CREATED: "Topic Created Successfully",
    TOPIC_FETCHED: "Topic Fetched Successfully",
    TOPIC_NOT_FETCHED: "Topic Not Fetched",
    TOPIC_LOGEDIN: "Topic Logedin Successfully",
    TOPIC_NOT_LOGEDIN: "Topic Not Logedin",
    TOPIC_UPDATED: "Topic Updated Successfully",
    TOPIC_NOT_UPDATED: "Topic Not Updated Successfully",
    TOPIC_DELETED: "Topic Deleted Successfully",
    TOPIC_NOT_DELETED: "Topic Not Deleted",
    TOPIC_NOT_FOUND: "Topic Not Found",
    TOPIC_ALREADY_EXISTS: "Topic Already Exists",
    TOPIC_NOT_EXISTS: "Topic Not Exists",
  },
  reviewsMessage: {
    REVIEWS_CREATED: "Reviews Created Successfully",
    REVIEWS_NOT_CREATED: "Reviews Not Created ",
    REVIEWS_FETCHED: "Reviews Fetched Successfully",
    REVIEWS_NOT_FETCHED: "Reviews Not Fetched",
    REVIEWS_UPDATED: "Reviews Updated Successfully",
    REVIEWS_NOT_UPDATED: "Reviews Not Updated",
    REVIEWS_DELETED: "Reviews Deleted Successfully",
    REVIEWS_NOT_DELETED: "Reviews Not Deleted",
    REVIEWS_NOT_FOUND: "Reviews Not Found",
    REVIEWS_ALREADY_EXISTS: "Reviews Already Exists",
    REVIEWS_NOT_EXISTS: "Reviews Not Exists",
  },
  mainSliderMessage: {
    MAIN_SLIDER_CREATED: "Main Slider Created Successfully",
    MAIN_SLIDER_NOT_CREATED: "Main Slider Not Created",
    MAIN_SLIDER_FETCHED: "Main Slider Fetched Successfully",
    MAIN_SLIDER_NOT_FETCHED: "Main Slider Not Fetched",
    MAIN_SLIDER_UPDATED: "Main Slider Updated Successfully",
    MAIN_SLIDER_NOT_UPDATED: "Main Slider Not Updated",
    MAIN_SLIDER_DELETED: "Main Slider Deleted Successfully",
    MAIN_SLIDER_NOT_DELETED: "Main Slider Not Deleted",
    MAIN_SLIDER_NOT_FOUND: "Main Slider Not Found",
    MAIN_SLIDER_FOUND: "Main Slider Found",
    MAIN_SLIDER_ALREADY_EXISTS: "Main Slider Already Exists",
    MAIN_SLIDER_NOT_EXISTS: "Main Slider Not Exists",
  },
  databaseMessage: {
    INVALID_OBJECTID: "Object ID is Invalid",
  },
  couponMessage: {
    COUPON_CREATED: "Coupon Created Successfully!",
    COUPON_NOT_CREATED: "Coupon not Created!",

    COUPON_UPDATED: "Coupon Updated Successfully !",
    COUPON_NOT_UPDATED: "Coupon not Updated!",

    COUPON_DELETED: "Coupon Deleted Successfully!",
    COUPON_NOT_DELETED: "Coupon not Deleted!",

    COUPON_FETCHED: "Coupon Fetched Successfully!",
    COUPON_NOT_FETCHED: "Coupon not Fetched!",

    COUPON_NOT_FOUND: "Coupon not Found!",
    COUPON_VERIFIED: "Coupon Applied!",

    COUPON_ERROR: "Oops Error with Coupon !",
    COUPON_EXISTS: "Oops Coupon Code is already exsts !",
  },
};
