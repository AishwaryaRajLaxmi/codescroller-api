const mongoose = require("mongoose");
const courseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    slug: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    courseDetails: {
      type: String,
      trim: true,
      default: "",
    },
    instructorName: {
      type: String,
      required: true,
      trim: true,
    },
    instructorAbout: {
      type: String,
      trim: true,
      default: "",
    },
    defaultVideoSource: {
      type: String,
      trim: true,
      enum: ["youtube", "dailymotion", "others"],
    },
    courseDuration: {
      type: String,
      trim: true,
    },

    instructorImage: {
      type: String,
      trim: true,
      default: "",
    },
    instructorDesignation: {
      type: String,
      default: "",
      trim: true,
    },
    seoTitle: {
      type: String,
      trim: true,
      default: "",
    },
    seoTags: {
      type: String,
      default: "",
      trim: true,
    },
    seoDescription: {
      type: String,
      default: "",
      trim: true,
    },
    thumbnail: {
      type: String,
      trim: true,
      default: "",
    },
    defaultVideo: {
      type: String,
      default: "",
      trim: true,
    },
    courseTag: {
      type: String,
      trim: true,
      default: "",
    },
    language: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "language",
      required: true,
    },
    level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "level",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    subCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subCategory",
        required: true,
      },
    ],
    topics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "topic",
        required: true,
      },
    ],
    highlights: {
      type: String,
      trim: true,
      default: "",
    },
    requirements: {
      type: String,
      trim: true,
      default: "",
    },
    prerequisite: {
      type: String,
      trim: true,
      default: "",
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    mrp: {
      type: Number,
      required: true,
    },
    validity: {
      type: String,
      required: true,
    },
    isReturnable: {
      type: Boolean,
      required: true,
      default: false,
    },
    returnDays: {
      type: Number,
      required: true,
    },
    courseStatus: {
      type: String,
      trim: true,
      enum: ["purchased", "returned"],
    },
    status: {
      type: Boolean,
      required: true,
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

module.exports = mongoose.model("course", courseSchema);
