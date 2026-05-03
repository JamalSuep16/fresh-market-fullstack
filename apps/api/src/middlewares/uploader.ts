import multer from 'multer';

// Menggunakan memory storage agar MacBook kamu tidak penuh dengan file sampah
const storage = multer.memoryStorage();

export const uploader = multer({ 
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // Maksimal 2MB agar hemat storage
});