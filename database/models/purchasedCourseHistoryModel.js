const mongoose = require("mongoose");
const purchasedCourseHistorySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      required: true,
    },
    comment: {
      type: String,
       default:"",
    },
    courseMrp: {
      type: Number,
      required: true,
    },
    courseSellingPrice: {
      type: Number,
      required: true,
    },
    couponName: {
      type: String,
      trim: true,
    },
    discountWithCouponAmount: {
      type: Number,
    },
    cGstAmount: {
      type: Number,
    },
    sGstAmount: {
      type: Number,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    subTotalAmount: {
      type: Number,
      required: true,
    },
    paymentId: {
      type: String,
    },
    paymentRequestId: {
      type: String,
    },
    courseStatus: {
      type: String,
      enum: ["purchased", "returned"],
      default: "purchased",
    },
    purchasedCourse: {
      type: mongoose.Schema.Types.ObjectId,
    },
    status: {
      type: Boolean,
      // required: true,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toObject: {
      transform: (doc, ret, option) => {
        delete ret.__v;
        ret.id = ret._id;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model(
  "purchasedCourseHistory",
  purchasedCourseHistorySchema
);
