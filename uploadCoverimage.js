const multer = require("multer")


let storage = multer.diskStorage({
    destination: "public/images/coverimage/",
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

let upload = multer({
    storage: storage
})

module.exports = { upload };