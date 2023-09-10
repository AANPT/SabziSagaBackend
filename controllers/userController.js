import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
// import  User  from "../models/User.js";
import Product from "../models/Product.js";
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataUri.js";
import crypto from "crypto";
import { sendToken } from "../utils/sendToken.js";
import { sendResetEmail } from "../utils/sendEmail.js";
import Shop from "../models/Shop.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, username, email, password, phoneNo } = req.body;
  const file = req.file;

  if (!name || !email || !password || !username || !phoneNo || !file)
    return next(new ErrorHandler("Please enter all field", 400));

  const fileUri = getDataUri(file);
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  // let user = await User.findOne({ email });

  // if (user) return next(new ErrorHandler("User Already Exist", 409));

  // user = await User.create({
  //   name,
  //   username,
  //   email,
  //   password,
  //   phoneNo,
  //   avatar: {
  //     public_id: mycloud.public_id,
  //     url: mycloud.secure_url,
  //   },
  // });

  // sendToken(res, user, "Registered Successfully", 201);
});

export const registerVendor = catchAsyncError(async (req, res, next) => {
  const { name, username, email, password, phoneNo, role } = req.body;
  const file = req.file;

  if (!name || !email || !password || !username || !phoneNo || !file)
    return next(new ErrorHandler("Please enter all field", 400));

  const fileUri = getDataUri(file);
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  // let user = await User.findOne({ email });

  // if (user) return next(new ErrorHandler("User Already Exist", 409));

  // user = await User.create({
  //   name,
  //   username,
  //   email,
  //   phoneNo,
  //   role,
  //   password,
  //   avatar: {
  //     public_id: mycloud.public_id,
  //     url: mycloud.secure_url,
  //   },
  // });
  // sendToken(res, user, "Vendor Registered Successfully", 201);
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorHandler("Please enter all field", 400));

  // const user = await User.findOne({ email }).select("+password");

  // if (!user) return next(new ErrorHandler("Incorrect Email or Password", 401));

  // const isMatch = await user.comparePassword(password);

  // if (!isMatch)
  //   return next(new ErrorHandler("Incorrect Email or Password", 401));

  // sendToken(res, user, `Welcome back, ${user.name}`, 200);
});

export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({
      success: true,
      message: "Logged Out Successfully",
    });
});

export const getMyProfile = catchAsyncError(async (req, res, next) => {
  // const user = await User.findById(req.user._id);
  // res.status(200).json({
  //   success: true,
  //   user,
  // });
});

export const updateProfile = catchAsyncError(async (req, res, next) => {});

export const updateProfilePicture = catchAsyncError(
  async (req, res, next) => {}
);

export const deleteMyProfile = catchAsyncError(async (req, res, next) => {});

export const changePassword = catchAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  if (!oldPassword || !newPassword || !confirmPassword)
    return next(new ErrorHandler("Please enter all field", 400));

  if (newPassword != confirmPassword)
    return next(
      new ErrorHandler("New and confirm password is not matching", 400)
    );

  // const user = await User.findById(req.user._id).select("+password");

  // const isMatch = await user.comparePassword(oldPassword);

  // if (!isMatch) return next(new ErrorHandler("Incorrect Old Password", 400));

  // user.password = newPassword;

  // await user.save();

  res.status(200).json({
    success: true,
    message: "Password Changed Successfully",
  });
});

export const forgetPassword = catchAsyncError(async (req, res, next) => {
  const email = req.body.email;

  if (!email) return next(new ErrorHandler("Please enter the email", 400));

  // const user = await User.findOne({ email });

  // if (!user) return next(new ErrorHandler("Not a registered email", 400));

  // const name = user.name;
  // const resetToken = await user.getResetToken();

  // await user.save();

  // await sendResetEmail(name, email, resetToken);

  res.status(200).json({
    success: true,
    message: `Reset token has been sent to ${email}`,
  });
});

export const ResetPassword = catchAsyncError(async (req, res, next) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  // const user = await User.findOne({
  //   resetPasswordToken,
  //   resetPasswordExpire: {
  //     $gt: Date.now(),
  //   },
  // });

  // if (!user)
  //   return next(new ErrorHandler("Token is invalid or has been expired", 401));

  // if (password != confirmPassword)
  //   return next(new ErrorHandler("both the password doesn't match", 400));

  // user.password = password;
  // user.resetPasswordToken = undefined;
  // user.resetPasswordExpire = undefined;

  // await user.save();

  res.status(200).json({
    success: true,
    message: "Password Changed Successfully",
  });
});

export const addToCart = catchAsyncError(async (req, res, next) => {
  // const user = await User.findById(req.user._id);

  // const product = await Product.findById(req.body.id);

  // if (!product) return next(new ErrorHandler("Invalid Product Id", 404));

  // const productExist = user.cart.find((item) => {
  //   if (item.product.toString() === product._id.toString()) return true;
  // });

  // if (productExist)
  //   return next(new ErrorHandler("Item Already Exist in the cart", 409));

  // user.cart.push({
  //   product: product._id,
  //   shopId: product.shopId,
  //   product_name: product.name,
  //   product_desc: product.description,
  //   product_price: product.price,
  //   product_buy_quant: 1,
  //   product_image_url: product.images.url,
  //   product_category: product.category,
  // });

  // await user.save();

  res.status(200).json({
    success: true,
    message: "Added to cart",
  });
});

export const removeFromCart = catchAsyncError(async (req, res, next) => {
  // const user = await User.findById(req.user._id);

  // // This work can also be done using cart id.
  // const product = await Product.findById(req.query.id);
  // if (!product) return next(new ErrorHandler("Invalid product Id", 404));

  // const newCart = user.cart.filter((item) => {
  //   if (item.product.toString() !== product._id.toString()) return item;
  // });

  // user.cart = newCart;
  // await user.save();

  res.status(200).json({
    success: true,
    message: "Removed From Playlist",
  });
});

export const updateCart = catchAsyncError(async (req, res, next) => {
  // const user = await User.findById(req.user._id);
  // const { cartId, buy_count } = req.body;

  // const cartProduct = user.cart.find((item) => {
  //   if (item._id.toString() === cartId.toString()) return item;
  // });

  // cartProduct.product_buy_quant = buy_count;

  // await user.save();

  res.status(200).json({
    success: true,
    message: "Quantity Updated Successfully",
  });
});

export const placeOrder = catchAsyncError(async (req, res, next) => {
  // // const user = await User.findById(req.user._id);

  // // const { address, state, city, pincode, products } = req.body;

  // // const parsedProducts = JSON.parse(products);

  // // const productsArray = parsedProducts.map((data) => ({
  // //   product: data.product,
  // //   shopId: data.shopId,
  // //   product_name: data.product_name,
  // //   product_desc: data.product_desc,
  // //   product_price: data.product_price,
  // //   product_buy_quant: data.product_buy_quant,
  // //   product_image_url: data.product_image_url,
  // //   product_category: data.product_category,
  // // }));

  // // const shop = await Shop.findById(productsArray[0].shopId);

  // // if (!shop) return next(new ErrorHandler("Shop Not Found", 401));

  // // const order = {
  // //   buyerName: user.name,
  // //   address: address,
  // //   state: state,
  // //   city: city,
  // //   pincode: pincode,
  // //   email: user.email,
  // //   phoneno: user.phoneNo,
  // //   products: productsArray, // Assuming products is an array of objects
  // // };

  // // user.order.push(order);
  // // shop.order.push(order);

  // // await user.save();
  // // await shop.save();

  // user.cart = [];

  // await user.save();

  res.status(200).json({
    success: true,
    message: "Order Placed",
  });
});
