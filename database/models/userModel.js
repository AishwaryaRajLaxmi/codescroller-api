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

    mobile: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
    },

    city: {
      type: String,
    },

    landmark: {
      type: String,
    },

    pincode: {
      type: String,
    },

    state: {
      type: String,
    },

    otp: {
      type: String,
    },
    otpExpiredAt: {
      type: Date,
      trim: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
    otpExpiredAt: {
      type: Date,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
    toObject: {
      transform: (doc, ret, option) => {
        delete ret.__v;
        delete ret.password;
        ret.id = ret._id;
        delete ret.otp;
        delete ret.otpExpiredAt;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("user", userSchema);
