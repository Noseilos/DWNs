import express from "express";
import { createLocation, getLocations, updateLocation, getLocationById, deleteLocation } from "../controllers/locationController.js";
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router();

router.route('/').get(getLocations).post(protect, admin, createLocation)
router.route('/:id').get(protect, admin, getLocationById).put(protect, admin, updateLocation).delete(protect, admin, deleteLocation);

export default router;