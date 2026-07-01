const { default: mongoose } = require("mongoose");

const SaleSchema = new mongoose.Schema({
  billNo: {
    type: Number,
    required: true
  },
  shopkeeperId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

  customerEmail: {
    type: String,
    required: true
  },

  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },

      productName: String,

      sellPrice: Number,

      quantity: Number,

      total: Number
    }
  ],

  grandTotal: {
    type: Number,
    required: true
  },
}, { timestamps: true });

const CoustomerBills=mongoose.model('customer_bills',SaleSchema);    

module.exports = CoustomerBills;