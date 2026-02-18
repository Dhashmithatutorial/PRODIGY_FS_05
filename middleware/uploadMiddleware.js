const multer = require("multer");
const path = require("path");

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

// File filter (only images)
const fileFilter = (req, file, cb) => {
  cb(null, true);
};


const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

module.exports = upload;
