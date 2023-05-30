import mongoose from "mongoose";

const allproductSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null,
    unique: true,
  },
  description: {
    type: String,
    default: null
  },
  ingredients: {
    type: String,
    default: null
  },
  price: { 
    type: Number,
    default: 0
  },
  sizes: { 
    type: Number,
    default: 0
  },
  parts: { 
    type: Number,
    default: 1
  },
  url: {
    type: String,
    default: null
  }
});

const Postres = mongoose.model("postres", allproductSchema);
export default Postres;