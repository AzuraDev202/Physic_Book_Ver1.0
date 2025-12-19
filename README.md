# Physics Book - Sách Vật Lý Tương Tác

## 📖 Tổng quan dự án

**Physics Book** là một ứng dụng web tương tác dành cho việc học Vật lý lớp 11, tập trung vào Chương 1: Dao động (theo chương trình Chân trời sáng tạo). Dự án kết hợp giữa nội dung học thuật với công nghệ AI và mô phỏng tương tác, giúp học sinh tiếp cận kiến thức vật lý một cách trực quan và hiệu quả.

## ✨ Các chức năng đã hoàn thiện

### 🎓 Hệ thống học tập
- **Quản lý bài học**: Hệ thống các bài học có cấu trúc rõ ràng với nội dung lý thuyết đầy đủ
- **Hiển thị công thức toán học**: Render công thức toán học chính xác với KaTeX và MathJax
- **Slide trình chiếu**: Xem bài giảng dưới dạng slide tương tác

### 🔬 Mô phỏng vật lý
- **Dao động điều hòa**: Mô phỏng chuyển động dao động điều hòa với các thông số tùy chỉnh
- **Con lắc đơn**: Mô phỏng chuyển động con lắc với tính toán chính xác
- **Chuyển động tròn**: Mô phỏng và đồ thị chuyển động tròn đều
- **Năng lượng dao động**: Phân tích năng lượng trong dao động điều hòa
- **Cộng hưởng**: Mô phỏng hiện tượng cộng hưởng cơ học

### 📝 Bài tập và luyện tập
- **Ngân hàng bài tập**: Hệ thống bài tập theo từng chủ đề
- **Chế độ luyện tập**: Luyện tập bài tập với phản hồi ngay lập tức
- **Theo dõi tiến độ**: Lưu trữ và hiển thị tiến độ học tập của người dùng

### 🤖 AI Assistant (Google Gemini)
- **Trợ lý học tập**: Chat với AI để giải đáp thắc mắc về vật lý
- **Giải bài tập**: AI hỗ trợ giải chi tiết các bài tập
- **Phân tích hình ảnh**: Nhận dạng và phân tích đề bài từ hình ảnh
- **Giải thích khái niệm**: Giải thích các khái niệm vật lý dễ hiểu
- **Chấm điểm tự động**: AI đánh giá và cho điểm bài làm của học sinh
- **Tạo bài tập**: Tự động sinh bài tập dựa trên nội dung

### 👥 Hệ thống người dùng
- **Đăng ký/Đăng nhập**: Xác thực người dùng với JWT
- **Phân quyền**: Hệ thống admin và user với các quyền khác nhau
- **Quản lý profile**: Quản lý thông tin cá nhân và tiến độ học tập

### ⚙️ Admin Dashboard
- **Quản lý bài học**: CRUD các bài học và chương
- **Quản lý bài tập**: Thêm, sửa, xóa bài tập
- **Quản lý người dùng**: Xem danh sách người dùng và hoạt động
- **Thống kê**: Dashboard thống kê người dùng và hoạt động hệ thống

### 🔍 Tính năng bổ sung
- **Tìm kiếm**: Tìm kiếm bài học và bài tập
- **Responsive Design**: Giao diện thích ứng mọi thiết bị
- **Dark Mode Ready**: Thiết kế sẵn sàng cho chế độ tối

## 🛠️ Công nghệ sử dụng

### Frontend
- **Next.js 14** - React framework với App Router
- **React 18** - Thư viện UI component
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **KaTeX & MathJax** - Render công thức toán học

### Backend
- **Next.js API Routes** - RESTful API endpoints
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM

### AI & Machine Learning
- **Google Gemini AI** (@google/generative-ai) - AI assistant
  - Model: Gemini 1.5 Flash
  - Vision API: Gemini 1.5 Flash cho phân tích hình ảnh

### Authentication & Security
- **JWT** (jsonwebtoken) - Token-based authentication
- **bcryptjs** - Password hashing

### Development Tools
- **ESLint** - Code linting
- **TypeScript Compiler** - Type checking
- **Autoprefixer** - CSS vendor prefixing

## 📦 Cài đặt dự án

### Yêu cầu hệ thống
- Node.js >= 18.0.0
- npm >= 8.0.0
- MongoDB (local hoặc MongoDB Atlas)

### Các bước cài đặt

1. **Clone repository**
```bash
git clone https://github.com/Azura-Deeper/Physic_Book_Ver1.0.git
cd Physic_Book_Ver1.0
```

2. **Cài đặt dependencies**
```bash
npm install
```

3. **Cấu hình biến môi trường**

Tạo file `.env.local` trong thư mục gốc với nội dung:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# App URL
NEXT_PUBLIC_API_URL=http://localhost:3000
```

4. **Khởi tạo database (tùy chọn)**

Seed dữ liệu mẫu:
```bash
node scripts/seed-chapters.js
node scripts/generate-exercises.js
```

Tạo tài khoản admin:
```bash
node scripts/create-admin.js
```

5. **Chạy development server**
```bash
npm run dev
```

Mở trình duyệt và truy cập: `http://localhost:3000`

### Build cho production

```bash
# Build ứng dụng
npm run build

# Chạy production server
npm start
```

### Các lệnh hữu ích

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Type checking
npm run type-check

# Clean build files
npm run clean
```

## 📂 Cấu trúc dự án

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── admin/             # Admin pages
│   ├── exercises/         # Exercise pages
│   ├── lessons/           # Lesson pages
│   └── practice/          # Practice mode
├── components/            # React components
│   ├── AI/               # AI-related components
│   └── simulator/        # Physics simulations
├── contexts/             # React contexts
├── hooks/                # Custom hooks
├── lib/                  # Libraries & utilities
│   └── gemini/          # Gemini AI integration
├── models/               # Database models
├── scripts/              # Utility scripts
└── types/                # TypeScript type definitions
```

## 👨‍💻 Tác giả

**Hung Ho**

## 📄 License

MIT License
