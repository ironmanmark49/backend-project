const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
mongoose.
connect("mongodb+srv://alexander1478546:alexander1478546@cluster0.kb2np.mongodb.net/lovely-blogs")
.then(()=>{
    console.log("Connected to database successfully!!");
})
.catch((error)=>{
    console.log(error);
})
