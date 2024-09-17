const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    blogTitle: {
        type: String,
    },
    CompanyName: {
        type: String,
    },
    CompanyLogo: {
        type: String,
    },
    UploadedTime: {
        type: String,
    },
    CoverImage: {
        type: String,
    },
    MetaDesc: {
        type: String,
    },
    BlogContent: {
        type: String,
    },
    BlogCategory: {
        type: String,
    },
    CompanyEmail: {
        type: String,
    }
});

const BlogModel = mongoose.model("blogschema", BlogSchema);

module.exports = BlogModel