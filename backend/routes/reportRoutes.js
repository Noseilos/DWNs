import express from 'express'
const router = express.Router();

import { getAllReports, uploadReportImages, resizeReportImages, createReports, getAllReportsById, updateReportsById, deleteReportsById } from '../controllers/reportsController.js'
import { protect, restrictTo } from '../controllers/authController.js'


router
  .route(`/`)
  .get(getAllReports)
  .post(
    protect, 
    restrictTo('admin'), 
    uploadReportImages,
    resizeReportImages,
    createReports
  );

router
  .route(`/:id`)
  .get(getAllReportsById)
  .patch(
    protect, 
    restrictTo('admin'), 
    uploadReportImages,
    resizeReportImages,
    updateReportsById
  )
  .delete(
    protect,
    restrictTo('admin'),
    deleteReportsById,
  );

export default router;
