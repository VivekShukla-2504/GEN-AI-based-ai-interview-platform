const multer = require("multer");

/* ---------------- STORAGE ---------------- */
const storage = multer.memoryStorage();

/* ---------------- FILE FILTER ---------------- */
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "application/pdf"
    ];

    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error("Only PDF files are allowed"), false);
    }

    cb(null, true);
};

/* ---------------- UPLOAD CONFIG ---------------- */
const upload = multer({
    storage,
    limits: {
        fileSize: 3 * 1024 * 1024 // 3MB
    },
    fileFilter
});

/* ---------------- ERROR HANDLER ---------------- */
const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({
            message: err.message
        });
    }

    if (err) {
        return res.status(400).json({
            message: err.message
        });
    }

    next();
};

module.exports = {
    upload,
    handleMulterError
};