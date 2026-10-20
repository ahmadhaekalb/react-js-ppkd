import { Router } from "express";
import { createTransaction } from "../controllers/transactionController.js";
import {getAllTransaction} from "../controllers/transactionController.js";

const router = Router();

router.post("/", createTransaction);
router.get("/", getAllTransaction);
export default router;