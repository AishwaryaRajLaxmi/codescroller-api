const mongoose = require("mongoose");

const purchasedCourseSchema = mongoose.Schema(
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
    courseName: {
      type: String,
      trim: true,
      required: true,
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
    isPaid: {
      type: Boolean,
      required: true,
    },
    courseValidity: {
      type: String,
      required: true,
    },
    courseCompletionStatus: {
      type: Number,
      default: 0,
      required: true,
    },
    returnDays: {
      type: String,
      required: true,
    },
    isReturnable: {
      type: Boolean,
      required: true,
      default: true,
    },
    returnBy: {
      type: String,
      enum: ["user", "admin"],
    },
    returnMessage: {
      type: String,
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
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
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

module.exports = mongoose.model("purchasedCourse", purchasedCourseSchema);
