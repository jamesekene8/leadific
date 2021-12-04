const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Domain = require("../model/domainModel");
const APIFeatures = require("../utils/apiFeatures");

exports.createDomain = catchAsync(async (req, res, next) => {
  const domain = await Domain.create(req.body);
  res.status(200).json({ status: "success", data: domain });
});

exports.getAllDomain = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Domain.find(), req.query).paginate();
  const domains = await features.query;
  res.status(200).json({ status: "success", data: domains });
});

exports.updateDomain = catchAsync(async (req, res, next) => {
  const updatedDomain = await Domain.findByIdAndUpdate(
    req.params.domainId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({ status: "success", data: updatedDomain });
});

exports.getByOwner = catchAsync(async (req, res, next) => {
  const domains = await Domain.find({ ownerId: req.params.ownerId });
  if (!domains) {
    return next(new AppError("Owner does not exist", 404));
  }
  res.status(200).json({ status: "success", data: domains });
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

exports.fuzzySearch = catchAsync(async (req, res, next) => {
  if (req.query.q) {
    const regex = new RegExp(escapeRegex(req.query.q), "gi");
    Domain.find({ domainName: regex }, function (err, foundDomains) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({ status: "success", data: foundDomains });
      }
    });
  }
});
