import Reports from '../models/reportsModel.js'
import catchAsync from '../utils/catchAsync.js';
import asyncHandler from '../middleware/asyncHandler.js'

import AppError from '../utils/appError.js';
import { getAll, getOne, updateOne, deleteOne } from './handlerFactory.js'

const createReports = catchAsync(async (req, res, next) => {
  try {
    
    const { locationName, summary, images, location, _id } = req.body;

    const report = new Reports({
      report: _id,
      locationName,
      summary,
      images,
      location: {
        type: 'Point',
        coordinates: [location.coordinates[1], location.coordinates[0]],
      },
    });

    await report.save();

    res.status(201).json({
      status: 'success',
      data: {
        report,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
});

const getAllReports = asyncHandler(async (req, res, next) => {
  const reports = await Reports.find({})
  res.status(200).json(reports);
})

const getMyReport = asyncHandler(async (req, res) => { 
  const reports = await Reports.find({ report: req.report._id });
  res.status(200).json(reports);
});

const getReportsById = asyncHandler(async (req, res) => {
  const report = await Reports.findById(req.params.id);

  if (report) {
      return res.json(report);
  } else {
      res.status(404);
      throw new Error('Resource not found');
  }
})
const updateReportsById = updateOne(Reports);
const deleteReport = deleteOne(Reports);

const verifyReport = asyncHandler(async (req, res) => {
  const report = await Reports.findById(req.params.id);

  if (report) {

    report.isVerified = true;
    await report.save();

    res.status(200).json({ message: "Report verified successfully" });
  } else {
    res.status(404);
    throw new Error("Report not found");
  }
});

export {
  createReports,
  getAllReports,
  getReportsById,
  updateReportsById,
  deleteReport,
  getMyReport,
  verifyReport
}
