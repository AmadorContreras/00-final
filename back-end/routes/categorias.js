import * as usersController from '../controllers/categoriasController.js';
import express from "express";

const router = express.Router();


// opciones de usuario
router.post("/categorias", usersController.registerUser);
router.get("/categorias", usersController.allUsers);
router.get("/categorias/:username", usersController.oneUser);
router.get("/categorias/id/:_id", usersController.oneUserId);
router.put("/categorias/:username", usersController.updateOneUser);
router.delete("/categorias/:_id", usersController.removeOneUser);



export default router;
