import express from 'express'
const router = express.Router();

import { getAllReports, createReports, getReportsById, updateReportsById, deleteReport, getMyReport, verifyReport } from '../controllers/reportsController.js'
import { protect, admin } from "../middleware/authMiddleware.js";


router
  .route('/')
  .get(getAllReports)
  .post(
    createReports
  );
  
router.route('/myreports').get(protect, getMyReport);

router
  .route('/:id')
  .get(getReportsById)
  .patch(
    protect, 
    admin, 
    updateReportsById
  )
  .delete(
    protect,
    admin, 
    deleteReport,
  );

router
    .route('/admin/:id')
    .patch(
      protect, 
      admin, 
      verifyReport
    )

export default router;
