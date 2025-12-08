import mongoose from "mongoose";

const billingSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    // Optional: which admin created this bill
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // if you create a Product model later
        },
        name: String,
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: true }, // price per unit
        total: { type: Number, required: true }, // quantity * price
      },
    ],

    subTotal: {
      type: Number,
      required: true,
    },

    taxAmount: {
      type: Number,
      default: 0,
    },

    discountAmount: {
      type: Number,
      default: 0,
    },

    grandTotal: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      enum: ["cod", "card", "upi", "netbanking", "wallet"],
      default: "cod",
    },
  },
  { timestamps: true }
);

const Billing = mongoose.model("Billing", billingSchema);
module.exports = Billing;
