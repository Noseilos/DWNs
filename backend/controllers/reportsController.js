const multer = require('multer');
const sharp = require('sharp');
const Reports = require('../models/reportsModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

const multerStorage = multer.memoryStorage();

const multerFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFileFilter,
});

exports.uploadReportImages = upload.fields([
  { name: "images", maxCount: 3 }
])

exports.resizeReportImages = catchAsync(async (req, res, next) => {
  console.log(req.files)

  if(!req.files.images) {
    return next()
  }
  req.body.images = []

  await Promise.all(
    req.files.images.map(async(file, i) => {
      const fileName = `report-${req.params.id}-${Date.now()}-${i + 1}.jpeg`
      
      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/reports/${fileName}`);

      req.body.images.push(fileName)
  }))


  next()
})


exports.getAllReports = factory.getAll(Reports);
exports.getAllReportsById = factory.getOne(Reports);
exports.createReports = factory.createOne(Reports);
exports.updateReportsById = factory.updateOne(Reports);
exports.deleteReportsById = factory.deleteOne(Reports);
