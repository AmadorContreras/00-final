import mongoose from "mongoose";

const categoriasSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
    default: "No hay información"
  }
});

const Categorias = mongoose.model("categorias", categoriasSchema);
export default Categorias;
