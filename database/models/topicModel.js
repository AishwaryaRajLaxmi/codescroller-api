const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
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

    seoTitle: {
      type: String,
    },

    seoDescription: {
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
  }
);

module.exports = mongoose.model("topic", topicSchema);
