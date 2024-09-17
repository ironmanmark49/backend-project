const multer = require("multer")


let storage = multer.diskStorage({
    destination: "public/images/userprofile/",
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

let profileUpload = multer({
    storage: storage
})

module.exports = { profileUpload };