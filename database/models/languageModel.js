const mongoose = require("mongoose");

const languageSchema = new mongoose.Schema({
  name: {
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

  timestamps: {
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
});

module.exports = mongoose.model("language", languageSchema);