const BlogModel = require("../models/BlogSchema");
const UserModel = require("../models/userSchema");

const AddAdmin = async (req, res) => {
    const NewUser = {
        CompanyName: req.body.CompanyName,
        CompanyEmail: req.body.CompanyEmail,
        ProfilePicture: req.body.ProfilePicture ?? "",
        AccPassword: req.body.AccPassword
    };
    try {
        const ExistingUser = await UserModel.findOne({ CompanyEmail: req.body.CompanyEmail });

        if (ExistingUser) {
            res.send({ message: "User Already Exist", status: 400 });
        }
        else {
            const NewAdmin = await UserModel.insertMany([NewUser]);
            if (NewAdmin) {
                res.send({ message: "Admin Successfully Added!!", status: 200 });
            }
            else {
                res.send({ message: "Error in Adding Admin Data", status: 504 });
            }
        }
    }
    catch (error) {
        console.log(error);
        res.send({ message: "Server Error", status: 500 })
    }
}

const DeleteAdmin = async (req, res) => {
    try {
        const _id = req.params.id;
        const Admindelete = await UserModel.findByIdAndDelete(_id, { new: true });
        if (Admindelete) {
            res.send({ message: "Delete user Successfully", status: 200 });
        }
        else {
            res.send({ message: "User Not deleted", status: 400 });
        }
    }
    catch (error) {
        console.log(error);
        res.send({ message: "Server Error", status: 500 })
    }
}

const updateAdmin = async (req, res) => {
    try {
        const _id = req.params.id;
        let coverimage = ""
        
        if(req.file !== undefined){
            coverimage = req.file.filename;
          }
          else{
            coverimage = req.body.ProfilePicture;
          }

        const recivedData = {
            CompanyName: req.body.CompanyName,
            CompanyEmail: req.body.CompanyEmail,
            ProfilePicture: coverimage,
            AccPassword: req.body.AccPassword
        }

        const uniqueData = await UserModel.findOne({ _id })

        if (uniqueData.CompanyEmail === req.body.CompanyEmail) {
            const updatedUser = await UserModel.findByIdAndUpdate(_id, recivedData, { new: true })
        
            if (updatedUser) {
                res.send({ message: "User updated successfully!!", status: 200, data: [updatedUser.CompanyEmail, updatedUser.ProfilePicture, updatedUser.CompanyName, updatedUser._id] });
            }
            else {
                res.send({ message: "User updated successfully!!", status: 400 });
            }
        }
        else {
            await BlogModel.updateMany({ "CompanyEmail": uniqueData.CompanyEmail }, {"$set":{"CompanyEmail": req.body.CompanyEmail}})
            const updatedAdmin = await UserModel.findByIdAndUpdate(_id, recivedData, { new: true })
            if (updatedAdmin) {
                res.send({ message: "User updated successfully!!", status: 200, data: [updatedAdmin.CompanyEmail, updatedAdmin.ProfilePicture, updatedAdmin.CompanyName, updatedAdmin._id] });
            }
            else {
                res.send({ message: "User updated successfully!!", status: 400 });
            }
        }

    }
    catch (error) {
        console.log(error);
        res.send({ message: "Server Error", status: 500 });
    }
}

const getAllAdmin = async (req, res) => {
    const AllAdmin = await UserModel.find();
    if (AllAdmin) {
        res.send({ status: 200, AllAdmin: AllAdmin });
    }
    else {
        res.send({ status: 400 });
    }
}

const getIndividualAdmin = async (req, res) => {
    const _id = req.body.id;
    const databaseData = await UserModel.findOne({ _id });
    if(databaseData) {
        res.send({message: "Details Listed below", status: 200, databaseData : databaseData})
    }else{
        res.send({message: "Error in fetching data", status: 400, })
    }
}

module.exports = { AddAdmin, DeleteAdmin, updateAdmin, getAllAdmin, getIndividualAdmin }