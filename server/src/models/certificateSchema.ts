import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  certificateName: {
    type: String,
    required: true,
  },
  certificateType: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  certId: {
    type: String,
    required: true,
    unique: true,
  },
  certificateAddress: {
    type: String,
    required: true
  },
  minted: {
    type: Number,
    default: 0,
  },
  mintPrice: {
    type: Number,
  },
  totalAmount: {
    type: Number,
    default: 0
  },
  users: [{
    name: {
      type: String
    },
    certName: {
      type: String
    },
    date: {
      type: Date
    }
  }],
  owner: {
    type: String,
    required: true
  }
});

const certificateModel = mongoose.model("certificates", certificateSchema);

export default certificateModel;