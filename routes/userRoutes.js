import express from "express";

import {
  register,
  registerVendor,
  login,
  logout,
  getMyProfile,
  deleteMyProfile,
  updateProfile,
  updateProfilePicture,
  changePassword,
  forgetPassword,
  ResetPassword,
  addToCart,
  removeFromCart,
  updateCart,
  placeOrder,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

router.route("/register/user").post(singleUpload, register);
router.route("/register/vendor").post(singleUpload, registerVendor);

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticated, getMyProfile);

router.route("/me").delete(deleteMyProfile);

router.route("/updateprofile").put(updateProfile);

router.route("/updateprofilepicture").put(updateProfilePicture);

router.route("/changepassword").put(isAuthenticated, changePassword);

router.route("/forgotpassword").post(forgetPassword);

router.route("/resetpassword/:token").put(ResetPassword);

router.route("/addtocart").post(isAuthenticated, addToCart);

router.route("/removefromcart").delete(isAuthenticated, removeFromCart);

router.route("/updatecart").put(isAuthenticated, updateCart);

router.route("/checkout").post(isAuthenticated, placeOrder);

export default router;
