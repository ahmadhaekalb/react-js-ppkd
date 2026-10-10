import { Router } from "express";
import { getAllCategories, getOneCategory, createCategory, updateCategory, deleteCategory } from "../controllers/CategoryController.js";

const router = Router();

router.get("/", getAllCategories);
router.get("/:id", getOneCategory);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;