import multer from 'multer';
import path from 'path';
import fs from 'fs';

try {
  fs.readdirSync('src/uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('src/uploads');
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const uploadsDir = path.join(__dirname, '..', 'uploads');
    cb(null, uploadsDir);
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
  },
});

const limits = { fileSize: 5 * 1024 * 1024 };

const upload = multer({ storage, limits });

export default upload;
