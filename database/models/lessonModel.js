const mongoose = require("mongoose");
const lessonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    slug: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      required: true,
    },
    serialNo: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    contents: [
      {
        name: {
          type: String,
          required: true,
          trim: "",
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
        contentType: {
          type: String,
          enum: ["video", "pdf"],
          trim: true,
        },
        contentSource: {
          type: String,
          enum: ["youtube", "dailymotion"],
          trim: true,
        },
        contentUrl: {
          type: String,
          trim: true,
          default: "",
        },
        isFree: {
          type: Boolean,
          default: false,
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
    ],
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

module.exports = mongoose.model("lesson", lessonSchema);
