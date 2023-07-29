const mongoose = require("mongoose");
const reveiwSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      required: true,
    },

    ratings: {
      type: Number,
    },

    comment: {
      type: String,
    },

    reviewStatus: {
      type: String,
      default: "pending",
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

module.exports = mongoose.model("reveiw", reveiwSchema);
