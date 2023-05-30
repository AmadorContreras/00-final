import * as allProducts from '../controllers/allProductsController.js';
import express from "express";

const router = express.Router();


// opciones de usuario
router.post("/postres", allProducts.registerUser);
// // router.post("/postres/log", allProducts.loginUser);
router.get("/postres", allProducts.allPostres);
router.get("/postres/:name", allProducts.oneUser);
router.get("/postres/name/:name", allProducts.findOneUser);
router.get("/postres/id/:_id", allProducts.oneUserId);
router.put("/postres/:name", allProducts.updateOneUser);
router.delete("/postres/:_id", allProducts.removeOneUser);



export default router;
