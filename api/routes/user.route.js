import express from "express";
import { deleteUser, getUser, getCurrentUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

// Handle /me route before the :id parameter
router.get("/me", verifyToken, getCurrentUser);
router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", getUser);

export default router;
