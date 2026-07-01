const mongoose = require("mongoose");

const purchaseHistorySchema = new mongoose.Schema({
    shopkeeperId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true
    },

    productName: {
        type: String,
        required: true,
        trim: true
    },

    quantityPurchased: {
        type: Number,
        required: true,
        min: 1
    },

    buyPrice: {
        type: Number,
        required: true
    },

    supplier: {
        type: String,
        required: true,
        trim: true
    },

    expiry: {
        type: Date
    }
}, {
    timestamps: true
});

const PurchaseHistory = mongoose.model(
    "Purchase_History",
    purchaseHistorySchema
);

module.exports = PurchaseHistory;