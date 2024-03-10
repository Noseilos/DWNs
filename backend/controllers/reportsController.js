import Reports from '../models/reportsModel.js'
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import { getAll, getOne, updateOne, deleteOne } from './handlerFactory.js'

const createReports = catchAsync(async (req, res, next) => {
  try {
    
    const { locationName, summary, images, location, _id } = req.body;

    const report = new Reports({
      user: _id,
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

const getAllReports = catchAsync(async (req, res, next) => {
  const reports = await Reports.find()

  console.log(reports)
  res.status(200).json({
    status: 'success',
    results: reports.length,
    reports
  });
})

const getAllReportsById = getOne(Reports);
const updateReportsById = updateOne(Reports);
const deleteReportsById = deleteOne(Reports);

export {
  createReports,
  getAllReports,
  getAllReportsById,
  updateReportsById,
  deleteReportsById
}