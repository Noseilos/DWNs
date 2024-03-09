import express from 'express'
const router = express.Router();

import { getAllReports, uploadReportImages, resizeReportImages, createReports } from "../controllers/reportsController.js"
import { protect, restrictTo } from "../controllers/authController.js"


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

// router
//   .route(`/:id`)
//   .get(reportsController.getAllReportsById)
//   .patch(
//     authController.protect, 
//     authController.restrictTo('admin'), 
//     reportsController.uploadReportImages,
//     reportsController.resizeReportImages,
//     reportsController.updateReportsById
//   )
//   .delete(
//     authController.protect,
//     authController.restrictTo('admin'),
//     reportsController.deleteReportsById,
//   );

  export default router;
