import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    label: String, // Home, Office, etc.
    line1: { type: String, required: true },
    line2: String,
    city: String,
    state: String,
    pincode: String,
    country: { type: String, default: "India" },
  },
  { _id: false }
);

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    addresses: [addressSchema],

    role: {
      type: String,
      enum: ["user"],
      default: "user",
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    // Reset password handling
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;