import express from "express";
import mongoose from "mongoose";
import cors from "cors";


import usersRoutes from "./routes/usersRoutes.js"
import fogonesRoutes from "./routes/fogonesRoutes.js"
import categorias from "./routes/categorias.js"
import postres from "./routes/allProductsRoutes.js"

// Conexión BD
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://amador:amatorius@tienta.hlmicih.mongodb.net/');
// mongoose.connect('mongodb://127.0.0.1:27017/tienda');

// Nesesario para que tenga formato JSON
const app = express();
app.use(express.json());

// Habilitar cors
app.use(cors());


// Rutas
app.use("/api", usersRoutes);
app.use("/api", fogonesRoutes);
app.use("/api", categorias);
app.use("/api", postres);

// Control 404. Siempre al final
const auxRouter = express.Router();
auxRouter.use("*", (req, res) => {
  res.status(404).json({
      success: "false",
      message: "Page not found",
      error: {
          statusCode: 404,
          message: "You reached a route that is not defined on this server",
      },
  });
});

// Evita crash
process.on('uncaughtException', (error)  => {
  console.log('Something terrible happend: ',  error);
  process.exit(1); // salir de la aplicación
});

process.on('unhandledRejection', (error, promise) => {
  console.log(' We forgot to handle a promise rejection here: ', promise);
  console.log(' The error was: ', error );
});

// Puerto
app.listen(8800, () => {
  console.log("Connected! to MongoDB");
});
