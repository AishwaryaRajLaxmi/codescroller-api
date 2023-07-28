const mongoose = require("mongoose");
const courseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      unique: true,
    },

    courseDetails: {
      type: String,
      trim: true,
    },

    instructorName: {
      type: String,
    },

    instructorAbout: {
      type: String,
    },

    instructorImage: {
      type: String,
    },
    
    instructorDesignation: {
      type: String,
    },

    seoTitle: {
      type: String,
    },

    seoDescription: {
      type: String,
    },

    image: {
      type: String,
    },

    courseTag: {
      type: String,
    },

    language: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "language",
    },
    level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "level",
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
      },
    ],

    subCategories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subCategory",
      },
    ],

    topics: [
      {
        type: String,
        ref: "topic",
      },
    ],

    highlights: {
      type: String,
    },
    requirements: {
      type: String,
    },
    prerequisite: {
      type: String,
    },
    sellingPrice: {
      type: String,
    },
    mrp: {
      type: Number,
    },
    validity: {
      type: Number,
    },
    isReturnable: {
      type: Boolean,
    },
    returnDays: {
      type: Number,
    },
    courseStatus: {
      type: String,
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
