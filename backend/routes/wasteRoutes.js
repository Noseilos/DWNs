import express from "express";
import { createWaste, getWastes, updateWaste, getWasteById, deleteWaste } from "../controllers/wasteController.js";
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router();

router.route('/').get(getWastes).post(protect, admin, createWaste)
router.route('/:id').get(protect, admin, getWasteById).put(protect, admin, updateWaste).delete(protect, admin, deleteWaste);

export default router;