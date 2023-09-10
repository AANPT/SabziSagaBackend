import Shop from "../models/Shop.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import ApiFeatures from "../utils/apiFeatures.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";
export const createShop = catchAsyncError(async (req, res, next) => {
  const { name, description, service, email } = req.body;
  const file = req.file;

  if (!name || !description || !email || !file)
    return next(new ErrorHandler("please add all fields", 400));

  const fileUri = getDataUri(file);
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  const shop = await Shop.create({
    name,
    description,
    service,
    email,
    images: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });
  res.status(201).json({
    success: true,
    // shop,
    message: "Shop Created Successfully. Now you can add items int it.",
  });
});

export const getAllShops = catchAsyncError(async (req, res, next) => {
  // const resultPerPage = 5;
  // const apiFeature = new ApiFeatures(Shop.find(), req.query)
  //   .search()
  //   .pagination(resultPerPage);
  // // const shops = await Shop.find();

  // const shops = await apiFeature.query;
  const shops = await Shop.find();
  res.status(200).json({
    success: true,
    shops,
  });
});

export const getMyShop = catchAsyncError(async (req, res, next) => {
  const email = req.params.email;
  const shop = await Shop.find({ email });
  if (!shop) {
    return next(new ErrorHandler("shop not found", 404));
  }

  res.status(200).json({
    success: true,
    shop,
  });
});

export const getShopDetails = catchAsyncError(async (req, res, next) => {
  const shop = await Shop.findById(req.params.id);

  if (!shop) {
    return next(new ErrorHandler("shop not found", 404));
  }

  res.status(200).json({
    success: true,
    shop,
  });
});

export const updateShopDetails = catchAsyncError(async (req, res, next) => {
  let shop = Shop.findById(req.params.id);

  if (!shop) {
    return next(new ErrorHandler("shop not found", 404));
  }

  shop = await Shop.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    shop,
  });
});

export const deleteShop = catchAsyncError(async (req, res, next) => {
  const shop = await Shop.findById(req.params.id);

  if (!shop) {
    return next(new ErrorHandler("shop not found", 404));
  }

  await shop.deleteOne();

  res.status(200).json({
    success: true,
    message: "shop deleted successfully",
  });
});
