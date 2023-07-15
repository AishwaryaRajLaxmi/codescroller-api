const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
    },

    phoneNumber: {
      type: Number,
      required: true,
    },
  },

  {
    timestamps: true,
    toObject: {
      transform: (doc, ret) => {
        delete ret.__v;
        delete ret.password;
        ret.id = ret._id;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("user", userSchema);
