
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
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
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

    contents: [
      {
        name: {
          type: String,
          required: true,
        },
        slug: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        contentType: {
          type: String,
          enum: ["video", "pdf"],
          default: "video",
          required: true,
        },
        contentSource: {
          type: String,
          enum: ["youtube", "dailymotion"],
          default: "youtube",
          required: true,
        },
        contentUrl: {
          type: String,
          required: true,
        },
        isDeleted: {
          type: Boolean,
          default: false,
        },
        status: {
          type: Boolean,
          default: true,
        },
        isFree: {
          type: Boolean,
          default: false,
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
