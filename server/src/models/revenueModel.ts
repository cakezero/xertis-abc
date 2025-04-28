import mongoose from "mongoose";

const revenueSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  Minters: {
    type: Number,
    required: true
  },
  Month: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
}, { timestamps: false });

export const revenue = mongoose.model("revenues", revenueSchema)