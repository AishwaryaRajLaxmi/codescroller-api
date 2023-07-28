const mongoose = require("mongoose");

const languageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
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

module.exports = mongoose.model("language", languageSchema);
