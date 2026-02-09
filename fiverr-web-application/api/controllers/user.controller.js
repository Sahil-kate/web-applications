import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import mongoose from "mongoose";

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(createError(404, "User not found!"));
    }

    if (req.userId !== user._id.toString()) {
      return next(createError(403, "You can delete only your account!"));
    }
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("deleted.");
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next(createError(400, "Invalid user ID format"));
    }
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(createError(404, "User not found!"));
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    if (!req.userId) {
      return next(createError(401, "User not authenticated"));
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return next(createError(404, "User not found!"));
    }
    
    // Convert to plain object and remove sensitive data
    const userObject = user.toObject();
    delete userObject.password;
    
    res.status(200).json(userObject);
  } catch (err) {
    console.error("Error in getCurrentUser:", err);
    next(err);
  }
};
