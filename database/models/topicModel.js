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

    status: {
      type: Boolean,
      required: true,
      default: true,
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

module.exports = mongoose.model("topic", topicSchema);
