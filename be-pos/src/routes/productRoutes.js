import { Router } from "express";
import { getAllProducts, getOneProducts, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getOneProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;