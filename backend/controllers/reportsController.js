import multer from 'multer'
import sharp from 'sharp'
import Reports from '../models/reportsModel.js'
import catchAsync from '../utils/catchAsync.js'
import factory from './handlerFactory.js'
import AppError from '../utils/appError.js'

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

const uploadReportImages = upload.fields([
  { name: "images", maxCount: 3 }
])

const resizeReportImages = catchAsync(async (req, res, next) => {
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
        .toFile(`uploads/reports/${fileName}`);

      req.body.images.push(fileName)
  }))


  next()
})

const createReports = catchAsync(async (req, res, next) => {
  try {
    const { summary, images, location } = req.body;
    const { _id: user } = req.user; 

    const report = new Reports({
      user,
      summary,
      images,
      location: {
        type: 'Point',
        coordinates: [location.lat, location.lng],
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

const getAllReports = factory.getAll(Reports);
const getAllReportsById = factory.getOne(Reports);
const updateReportsById = factory.updateOne(Reports);
const deleteReportsById = factory.deleteOne(Reports);

export {
  multerFileFilter,
  uploadReportImages,
  resizeReportImages,
  createReports,
  getAllReports,
  getAllReportsById,
  updateReportsById,
  deleteReportsById
}