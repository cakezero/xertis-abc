import mongoose from "mongoose";

const certOwnerSchema = new mongoose.Schema({
  walletAddress: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  totalMinters: {
    type: Number,
    default: 0
  },
  walletBalance: {
    type: Number,
    default: 0
  },
  password: {
    type: String,
    required: true
  },
  totalRevenue: {
    type: Number,
    default: 0
  },
  certificates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "certificates"
  }]
})

const certOwner = mongoose.model("certOwner", certOwnerSchema)

export default certOwner;