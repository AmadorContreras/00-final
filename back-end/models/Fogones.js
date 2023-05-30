import mongoose from "mongoose";

const fogonesSchema = new mongoose.Schema({
  product: {
    type: String,
    default: null,
    unique: true,
    required: true
  },
  description: {
    type: String,
    default: null
  },
  price: { 
    type: Number,
    default: 0
  },
  stock: { 
    type: Number,
    default: 0
  }
});

const Fogones = mongoose.model("fogones", fogonesSchema);
export default Fogones;
