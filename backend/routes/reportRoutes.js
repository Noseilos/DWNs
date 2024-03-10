import express from 'express'
const router = express.Router();

import { getAllReports, createReports, getAllReportsById, updateReportsById, deleteReportsById } from '../controllers/reportsController.js'
import { protect, restrictTo } from '../controllers/authController.js'


router
  .route(`/`)
  .get(getAllReports)
  .post(
    createReports
  );

router
  .route(`/:id`)
  .get(getAllReportsById)
  .patch(
    protect, 
    restrictTo('admin'), 
    updateReportsById
  )
  .delete(
    protect,
    restrictTo('admin'),
    deleteReportsById,
  );

export default router;
