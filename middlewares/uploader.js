const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: "public/images/",
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "-" + file.originalname);
    },
});

const uploader = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const supportedImage = /jpg|jpeg/;
        const extension = path.extname(file.originalname);

        if (supportedImage.test(extension)) {
            cb(null, true);
        } else {
            cb(new Error("Your file type is not valid"));
        }
    },
});

module.exports = uploader;
