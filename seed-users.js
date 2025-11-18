// Script tạo 20 user mẫu cho MongoDB
require('dotenv').config({ path: require('path').join(__dirname, '.env.local') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const path = require('path');
const User = require(path.join(__dirname, 'models', 'User.ts')).default;


const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('Lỗi: Không tìm thấy biến môi trường MONGODB_URI. Hãy kiểm tra file .env.local!');
  process.exit(1);
}

const users = Array.from({ length: 20 }).map((_, i) => ({
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  password: bcrypt.hashSync('123456', 10),
  role: 'user',
  isActive: true,
}));

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    await User.deleteMany({ role: 'user' }); // Xoá user cũ (không xoá admin)
    await User.insertMany(users);
    console.log('Đã tạo 20 user thành công!');
    process.exit(0);
  } catch (err) {
    console.error('Lỗi khi seed user:', err);
    process.exit(1);
  }
}

seed();
