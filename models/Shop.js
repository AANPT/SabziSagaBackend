import mongoose from "mongoose";
import validator from "validator";
const shopSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter shop name"],
  },
  description: {
    type: String,
    required: [true, "Please Enter the shop description"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: validator.isEmail,
  },
  service: {
    type: String,
    required: [true, "Please enter the services offered by the shop"],
  },

  images: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  order: [
    {
      buyerName: String,
      address: String,
      state: String,
      city: String,
      pincode: Number,
      email: String,
      phoneno: Number,
      total: Number,
      products: [
        {
          product: String,
          shopId: String,
          product_name: String,
          product_desc: String,
          product_price: Number,
          product_buy_quant: Number,
          product_image_url: String,
          product_category: String,
        },
      ],
    },
  ],
});

export default mongoose.model("Shop", shopSchema);
