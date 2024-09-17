const express = require("express");
const { addBlog, deleteBlog, updateBlog, getAllBlog, fetchAllBlog } = require("../controllers/BlogController");
const { AddAdmin, DeleteAdmin, updateAdmin, getAllAdmin, getIndividualAdmin } = require("../controllers/userController");
const { Login } = require("../controllers/LoginController");
const { upload } = require("../uploadCoverimage");
const { profileUpload } = require("../uploadUserProfile");

const router = new express.Router();

// Login Routeres
router.post("/login", Login)

// Blog Routers
router.post("/", getAllBlog)
router.get("/allblogs", fetchAllBlog);
router.post("/addBlog", upload.single("CoverImage"),addBlog);
router.patch("/:id", upload.single("CoverImage"), updateBlog);
router.delete("/:id", deleteBlog);


// Admin Routers
router.get("/admin", getAllAdmin);
router.post("/personalAdmin", getIndividualAdmin);
router.post("/admin", AddAdmin);
router.delete("/admin/:id", DeleteAdmin);
router.patch("/admin/:id", profileUpload.single("ProfilePicture"),  updateAdmin);

module.exports = router;