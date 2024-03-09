const express = require('express');
const reportsController = require('../controllers/reportsController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route(`/`)
  .get(reportsController.getAllReports)
  .post(
    authController.protect, 
    authController.restrictTo('admin'), 
    reportsController.createReports
  );

router
  .route(`/:id`)
  .get(reportsController.getAllReportsById)
  .patch(
    authController.protect, 
    authController.restrictTo('admin'), 
    reportsController.uploadReportImages,
    reportsController.resizeReportImages,
    reportsController.updateReportsById
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    reportsController.deleteReportsById,
  );

module.exports = router;
