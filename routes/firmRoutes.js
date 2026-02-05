const express = require('express');
const path = require('path');
const multer = require('multer');
const firmController = require('../controllers/firmController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

// multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post(
  '/add-firm',
  verifyToken,
  upload.single('image'), // ✅ multer BEFORE controller
  firmController.addFirm
);

router.get('/uploads/:imageName', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'uploads', req.params.imageName));
});

router.delete('/:firmId', firmController.deleteFirmById);

module.exports = router;
