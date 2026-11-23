const { default: mongoose } = require("mongoose");

//Schema
const userSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    shopkeeperId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });


const Coustomer=mongoose.model('customer_infos',userSchema);    

module.exports = Coustomer;