import mongoose from "mongoose";
import slugify from "slugify";

const reportsSchema = new mongoose.Schema(
  {
    locationName: {
      type: String,
      trim: true,
      required: [true, 'A report must have a location name'],
    },
    wasteName: {
      type: String,
      trim: true,
      required: [true, 'A report must have a waste name'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    slug: String,
    summary: {
      type: String,
      trim: true,
      required: [true, 'A report must have a summary'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now()
    },
    location: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false,
    },
  },

  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

reportsSchema.index({ slug: 1 });
reportsSchema.index({ location: "2dsphere" });

reportsSchema.pre("save", function (next) {
  this.slug = slugify(this.locationName, { lower: true });
  next();
});

const Reports = mongoose.model("Reports", reportsSchema);

export default Reports;

