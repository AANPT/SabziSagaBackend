import express from "express";

import {
  getAllShops,
  createShop,
  getShopDetails,
  updateShopDetails,
  deleteShop,
  getMyShop,
} from "../controllers/shopController.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

//Get all shops
router.route("/shops").get(getAllShops);

router.route("/myshop/:email").get(getMyShop);

//Create shops
router.route("/shop/new").post(singleUpload, createShop);

//To get the detail of single shop
router.route("/shop/:id").get(getShopDetails);

// To update shop details
router.route("/shop/:id").put(updateShopDetails);

// to Delete shop
router.route("/shop/:id").delete(deleteShop);

export default router;
