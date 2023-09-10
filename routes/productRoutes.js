import express from "express";

import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  getShopProducts,
} from "../controllers/productController.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();
router.route("/products").get(getAllProducts);

router.route("/products/:shopId").get(getShopProducts);

router.route("/product/new").post(singleUpload, createProduct);

router
  .route("/product/:id")
  .put(updateProduct)
  .delete(deleteProduct)
  .get(getProductDetails);

export default router;
