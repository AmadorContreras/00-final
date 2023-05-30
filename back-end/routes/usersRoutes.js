import * as usersController from '../controllers/usersController.js';
import express from "express";

const router = express.Router();


// opciones de usuario
router.post("/usuarios", usersController.registerUser);
router.post("/usuarios/log", usersController.loginUser);
router.get("/usuarios", usersController.allUsers);
router.get("/usuarios/:username", usersController.oneUser);
router.get("/usuarios/name/:username", usersController.findOneUser);
router.get("/usuarios/id/:_id", usersController.oneUserId);
router.put("/usuarios/:username", usersController.updateOneUser);
router.delete("/usuarios/:_id", usersController.removeOneUser);



export default router;
