import * as fogonesController from './../controllers/fogonesController.js';
import express from "express";

const router = express.Router();

// // Register user
// router.post("/register", usersController.registerUser);

// // User login function
// router.post("/login", usersController.loginUser);


// Register user
router.post("/fogones", fogonesController.newFogones);
router.get("/fogones", fogonesController.allFogones);



export default router;
