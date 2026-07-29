const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    shopkeeperId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    productId: {
      type: Number,
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
    },

    buyPrice: {
      type: Number,
      required: true,
    },

    sellPrice: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

// Product ID should be unique only for each shopkeeper
productSchema.index(
  {
    shopkeeperId: 1,
    productId: 1,
  },
  {
    unique: true,
  }
);

const Product = mongoose.model("products", productSchema);

module.exports = Product;