import express from "express";
import {
  registerUser,
  loginUser,
  followUser,
  searchUsers,
  getUser,
  deleteUser,
  updateUser,
} from "../controllers/userController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/search", protect, searchUsers);
router.get("/:id", protect, getUser);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);
router.post("/follow", protect, followUser);

export default router;
