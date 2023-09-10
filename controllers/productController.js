import Product from "../models/Product.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import ApiFeatures from "../utils/apiFeatures.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";

export const createProduct = catchAsyncError(async (req, res, next) => {
  const { shopId, name, price, description, category, quantity } = req.body;
  const file = req.file;
  const fileUri = getDataUri(file);
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
  const product = await Product.create({
    shopId,
    name,
    price,
    description,
    category,
    quantity,
    images: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "product added successfully",
  });
});

export const getAllProducts = catchAsyncError(async (req, res, next) => {
  // const resultPerPage = 5; //preffered 20
  // const productCount = await Product.countDocuments();
  // const apiFeature = new ApiFeatures(Product.find(), req.query)
  //   .search()
  //   .filter()
  //   .pagination(resultPerPage);

  // const products = await apiFeature.query;

  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
});

export const getShopProducts = catchAsyncError(async (req, res, next) => {
  const { shopId } = req.params;

  const products = await Product.find({ shopId });

  if (!products)
    return next(
      new ErrorHandler("This shop Doesn't have any products listed", 401)
    );

  res.status(200).json({
    success: true,
    products,
  });
});

export const getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
    // productCount,
  });
});

export const updateProduct = catchAsyncError(async (req, res, next) => {
  let product = Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

export const deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await cloudinary.v2.uploader.destroy(product.images.public_id);

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
