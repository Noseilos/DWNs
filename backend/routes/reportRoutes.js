import express from 'express'
const router = express.Router();

import { getAllReports, createReports, getReportsById, updateReportsById, deleteReportsById } from '../controllers/reportsController.js'
import { protect, admin } from "../middleware/authMiddleware.js";


router
  .route(`/`)
  .get(getAllReports)
  .post(
    createReports
  );

router
  .route(`/:id`)
  .get(getReportsById)
  .patch(
    protect, 
    admin, 
    updateReportsById
  )
  .delete(
    protect,
    admin, 
    deleteReportsById,
  );

export default router;
