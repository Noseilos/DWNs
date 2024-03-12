import express from "express";
const router = express.Router();
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  softDeleteUser,
  getUserById,
  updateUser,
  restoreUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/logout", logoutUser);
router.post("/login", loginUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .patch(protect, admin, softDeleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

  router.patch("/restore/:id", protect, admin, restoreUser);

export default router;
