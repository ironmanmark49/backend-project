const mongoose = require("mongoose");
const UserModel = require("../models/userSchema");

const Login = async (req, res) => {
    const validator = await UserModel.findOne(
        {
            CompanyEmail: req.body.email,
            AccPassword: req.body.password
        }
    );
    if(validator){
        res.send({ message: "Logged In Successfully", status: 200, isLoggedin: true, data: [validator.CompanyEmail, validator.ProfilePicture, validator.CompanyName, validator._id] })
    }
    else{
        res.send({ message: "Credantials don't match", status: 400 })
    }

}

module.exports = { Login }