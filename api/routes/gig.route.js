import express from "express";
import {
  createGig,
  deleteGig,
  getGig,
  getGigs
} from "../controllers/gig.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res, next) => {
  try {
    // Log the incoming request
    console.log("Creating new gig with data:", req.body);
    
    if (!req.userId) {
      return res.status(401).send("User not authenticated");
    }

    const newGig = new Gig({
      userId: req.userId,
      ...req.body,
    });

    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (err) {
    console.error("Server error creating gig:", err);
    next(err);
  }
});
router.delete("/:id", verifyToken, deleteGig);
router.get("/single/:id", getGig);
router.get("/", getGigs);

export default router;
