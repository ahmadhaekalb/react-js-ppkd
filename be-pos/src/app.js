import express from "express";
import cors from "cors";
// import {login} from ".controllers/AuthController.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "WELCOME TO POS API"
    })
})



export default app;