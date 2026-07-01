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
        unique: true,
    },
    shopName: {
        type: String,
        required: true,
    },
    shopAddress: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});


const User=mongoose.model('user_info',userSchema);    

module.exports = User;