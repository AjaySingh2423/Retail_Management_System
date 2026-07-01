const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, ".env")
});

const express=require("express");
const {connectMongoDB} = require('./connection');
const userRouter = require("./routes/user");
const cors=require("cors");
const cookieParser = require("cookie-parser");

 

connectMongoDB(process.env.MONGO_URI)
.then(()=>console.log("Mongobd connected"));

const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended:false}));  //It is a middleware
app.use(cors({
    origin: process.env.FRONTEND_URL, // React URL
    credentials: true                
}));
app.use(cookieParser());  

app.use('/', userRouter);
app.listen(process.env.PORT, ()=> console.log("Server Started"));