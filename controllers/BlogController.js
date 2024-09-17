const BlogModel = require("../models/BlogSchema");


const addBlog = async (req, res) => {
    
    try {
        const receivedData = {

            CompanyName: req.body.CompanyName,
            blogTitle: req.body.title,
            UploadedTime: req.body.UploadedTime,
            CoverImage: req.file.filename,
            MetaDesc: req.body.metaDesc,
            BlogContent: req.body.blogContent,
            BlogCategory: req.body.BlogCategory,
            CompanyEmail: req.body.CompanyEmail,
        };

        const newUserData = await BlogModel.insertMany([receivedData]);

        if (newUserData) {
            res.send({ message: "User Data Added Successfully", status: 200, newUserData: newUserData });
        } else {
            res.send({ message: "Error in Adding User Data", status: 400 });
        }
    } catch (error) {
        console.error("Error adding user:", error);
        res.send({ message: "Server Error", status: 500 });
    }

};

const deleteBlog = async (req, res) => {
    try {
        const _id = req.params.id;
        const blogDelete = await BlogModel.findByIdAndDelete(_id, { new: true });
        if (blogDelete) {
            res.send({ message: "User Delete Succesfully", status: 200 });
        }
        else {
            res.send({ message: "User Not Found", status: 400 });
        }
    }
    catch (error) {
        console.log(error);
        res.send({ message: "Server Error", status: 500 });
    }
}

const updateBlog = async (req, res) => {
    try {
        const _id = req.params.id;

        let coverimage = ""
        
        if(req.file !== undefined){
            coverimage = req.file.filename;
          }
          else{
            coverimage = req.body.CoverImage;
          }

        const receivedData = {
            CompanyName: req.body.companyName,
            CompanyEmail: req.body.companyEmail,
            blogTitle: req.body.title,
            MetaDesc: req.body.metaDesc,
            BlogContent: req.body.blogContent,
            CoverImage: coverimage,
            BlogCategory: req.body.blogCategory,
        };

        const BlogUpdate = await BlogModel.findByIdAndUpdate(_id, receivedData, { new: true, });
        
        if (BlogUpdate) {
            res.send({ message: "Blog Update successfully!!", status: 200, receivedData: updateBlog })
        } else {
            res.send({ message: "Blog not found!!", status: 400 })
        }
    }
    catch (error) {
        console.log(error);
        res.send({ message: "server eroor", status: 500 });
    }
}

const getAllBlog = async (req, res) => {
    try {
        const AllBlog = await BlogModel.find({CompanyEmail: req.body[0]});
        if (AllBlog) {
            res.send({ status: 200, AllBlog: AllBlog });
        }
        else {
            res.send({ status: 400 });
        }
    }
    catch (error) {
        console.log(error);
        res.send({ message: "Server Error", status: 500 });
    }
}

const fetchAllBlog = async (req, res) => {
    try {
        const AllBlog = await BlogModel.find();
        if (AllBlog) {
            res.send({ status: 200, AllBlog: AllBlog });
        }
        else {
            res.send({ status: 400 });
        }
    }
    catch (error) {
        console.log(error);
        res.send({ message: "Server Error", status: 500 });
    }
}

module.exports = { addBlog, deleteBlog, updateBlog, getAllBlog, fetchAllBlog }