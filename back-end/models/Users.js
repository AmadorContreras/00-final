import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    default: null
  },
  surname: {
    type: String,
    default: null
  },
  address: {
    type: String,
    default: null
  },
  email: { 
    type: String, 
    unique: true, 
    required: true 
  },
  birth: {
    type: String,
    default: null,
    set: function (value) {
      // Al guardar los datos, establece la fecha con el año, mes y día en formato "YYYY-MM-DD"
      if (!value) return null;
      return value;
    }
  },
  password: { 
    type: String, 
    required: true 
  },
});

const Users = mongoose.model("usuarios", usersSchema);
export default Users;
