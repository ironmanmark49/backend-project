const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
mongoose.
connect("mongodb+srv://ticket:4321@velvetblock.ykrp4uv.mongodb.net/?retryWrites=true&w=majority&appName=VelvetBlock")
.then(()=>{
    console.log("Connected to database successfully!!");
})
.catch((error)=>{
    console.log(error);
})