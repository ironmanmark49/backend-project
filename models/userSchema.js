const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
    CompanyName:{
        type: String
    },
    CompanyEmail:{
        type: String
    },
    ProfilePicture:{
        type: String
    },
    AccPassword:{
        type: String
    }
});

const UserModel = mongoose.model("userschema", UsersSchema);

module.exports = UserModel