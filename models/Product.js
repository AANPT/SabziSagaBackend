import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  shopId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product description"],
    maxLength: [8, "Price cannot exceed 8 figure"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: Number,
    required: [true, "please enter stock quantity"],
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

  category: {
    type: String,
    required: [true, "Please enter product category"],
  },
  Stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    maxLength: [4, "Product cannot exceed character"],
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
        default: "y",
      },
      rating: {
        type: Number,
        required: true,
        default: 0,
      },
      comment: {
        type: String,
        required: true,
        default: "y",
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Product", productSchema);
