import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import APIFeatures from '../utils/apiFeatures.js';

export const deleteOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
        status: 'success',
        message: 'Deleted document',
        data: doc,
    });
});

export const updateOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
});

export const createOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
  
    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
});

export const getOne = Model => catchAsync(async (req, res, next) => {
  let query = Model.findById(req.params.id)
  
  const doc = await query

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      doc,
    },
  });
});

export const getAll = Model => catchAsync(async (req, res, next) => {

  let filter = {}
  if (req.params.reportId) filter = {report: req.params.reportId}

  const features = new APIFeatures(Model.find(filter), req.query)
    .filter()
    .sort()
    .fieldLimiting()
    .pagination();
  const doc = await features.query;

  res.status(200).json({
    status: 'success',
    results: doc.length,
    data: {
      data: doc,
    },
  });
});
