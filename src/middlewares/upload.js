// src/middlewares/upload.js
const multer = require('multer');
const path = require('path');

// Cấu hình lưu trữ ảnh
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads');  // Lưu vào thư mục 'src/uploads'
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);  // Lấy phần mở rộng của file
        cb(null, Date.now() + ext);  // Đặt tên file duy nhất
    },
});

// Middleware để xử lý upload ảnh
const upload = multer({ storage: storage });

module.exports = upload;
