const { default: mongoose } = require("mongoose");

//Schema
const productSchema = new mongoose.Schema({
    shopkeeperId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    productId: {
        type: Number,
        required: true,
        unique: true,
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
   
}, { timestamps: true });

const Product=mongoose.model('products',productSchema);    

module.exports = Product;