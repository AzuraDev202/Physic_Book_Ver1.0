# 📚 Physics Book - Interactive Learning Platform

> **Sách Vật Lí 11 Tương Tác - Chương 1: Dao động**
> 
> Nền tảng học tập trực tuyến hiện đại cho môn Vật Lí lớp 11 theo chương trình Chân trời sáng tạo

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

## 🎯 Tổng quan

Physics Book là một ứng dụng web tương tác được xây dựng bằng **Next.js 14** và **TypeScript**, cung cấp trải nghiệm học tập vật lí hiện đại và toàn diện.

## ✨ Tính năng nổi bật

### 📖 Hệ thống Học tập
- **Slide Presentation System**: Trình chiếu bài học mượt mà với navigation keyboard/mouse
- **MathJax Integration**: Hiển thị công thức toán học LaTeX đẹp mắt và chính xác
- **Interactive Simulations**: Mô phỏng dao động điều hòa, con lắc, năng lượng
- **Progress Tracking**: Theo dõi tiến độ học tập real-time với tích xanh và progress bar
- **Toast Notifications**: Thông báo hoàn thành bài học với animation

### 📝 Hệ thống Bài tập
- **400+ Câu hỏi**: 100 câu hỏi cho mỗi bài học (4 bài)
- **Phân loại đa dạng**: Lý thuyết, Thực tế, Tính toán
- **3 Độ khó**: Cơ bản, Trung bình, Nâng cao
- **Practice Mode**: Luyện tập ngẫu nhiên 24 câu từ 4 bài học
- **Exercise Mode**: Làm bài tập theo từng bài (40 câu/bài)
- **Real-world Context**: Câu hỏi thực tế gắn liền với cuộc sống
- **Instant Feedback**: Giải thích chi tiết sau mỗi câu trả lời
- **Keyboard Shortcuts**: Phím 1-4 để chọn đáp án nhanh

### 👨‍💼 Hệ thống Quản trị (Admin)
- **Dashboard**: Thống kê tổng quan users, bài học, tiến độ
- **User Management**: Quản lý người dùng với phân trang
- **Exercise Management**: CRUD bài tập với bộ lọc và tìm kiếm
- **Pagination**: Hiển thị 20 bài tập/trang
- **Bulk Actions**: Xóa nhiều user cùng lúc

### 🔐 Xác thực & Bảo mật
- **JWT Authentication**: Đăng nhập/đăng ký an toàn
- **Password Hashing**: Mã hóa mật khẩu với bcryptjs
- **Protected Routes**: Bảo vệ các trang yêu cầu đăng nhập
- **Role-based Access**: Phân quyền Admin/User
- **Auto Login Persistence**: Duy trì phiên đăng nhập

### 🎨 UI/UX Excellence
- **Multi-theme Support**: Dark mode/Light mode hoàn chỉnh
- **Responsive Design**: Tối ưu cho desktop, tablet và mobile
- **Smooth Animations**: Transitions mượt mà và professional
- **Modern UI**: Gradient, shadows, hover effects
- **User Menu**: Avatar, dropdown menu với logout

## 🛠️ Công nghệ sử dụng

### Frontend
- **Next.js 14** - React framework với App Router
- **TypeScript** - Type safety và developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **MathJax 3** - Render công thức toán học LaTeX
- **React Hooks** - Custom hooks cho progress tracking

### Backend & Database
- **MongoDB Atlas** - Cloud database NoSQL
- **Mongoose** - ODM cho MongoDB với schema validation
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing security
- **Next.js API Routes** - Serverless API endpoints

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **Git** - Version control

## 🚀 Cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js >= 18.0.0
- npm >= 8.0.0
- MongoDB Atlas account

### 1. Clone repository
```bash
git clone https://github.com/AzuraDev202/Physic_Book_Ver1.0.git
cd Physic_Book_Ver1.0
```

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Cấu hình environment variables
Tạo file `.env.local` trong thư mục root:

```env
# MongoDB Atlas connection string
MONGODB_URI=your_mongodb_connection_string

# JWT Secret for authentication
JWT_SECRET=your_secure_jwt_secret_key

# NextAuth Configuration
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=http://localhost:3000
```

> **⚠️ Lưu ý bảo mật:**
> - KHÔNG commit file `.env.local` lên Git
> - KHÔNG để lộ secrets trong code hoặc README
> - Sử dụng mật khẩu mạnh và secret dài, ngẫu nhiên
> - Thay đổi ngay nếu lỡ để lộ credentials

### 4. Khởi tạo dữ liệu

#### Tạo admin account
```bash
node scripts/create-admin.js
```

#### Seed chapters (bài học)
```bash
node scripts/seed-chapters.js
```

#### Generate exercises (400 câu hỏi)
```bash
node scripts/generate-exercises.js
```

### 5. Chạy development server
```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

### 6. Build cho production
```bash
npm run build
npm start
```

## 📁 Cấu trúc dự án

```
Physic_Book_Ver1.0/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── admin/                # Admin APIs
│   │   │   ├── dashboard/        # Dashboard stats
│   │   │   ├── exercises/        # Exercise CRUD
│   │   │   └── users/            # User management
│   │   ├── auth/                 # Authentication
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── verify/
│   │   ├── chapters/             # Chapters API
│   │   ├── exercises/            # Exercises API
│   │   ├── progress/             # Progress tracking
│   │   ├── search/               # Search functionality
│   │   └── updateSimulation/     # Update simulation data
│   ├── admin/                    # Admin pages
│   │   ├── dashboard/            # Admin dashboard
│   │   └── exercises/            # Exercise management
│   ├── exercises/                # Exercise practice page
│   ├── lesson/[id]/              # Dynamic lesson pages
│   ├── lessons/                  # Lessons listing
│   ├── practice/                 # Random practice mode
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Homepage
├── components/                   # Reusable components
│   ├── AuthModal.tsx             # Login/Register modal
│   ├── Math.tsx                  # MathJax wrapper
│   ├── OscillationSimulation.tsx # Dao động simulation
│   ├── Sidebar.tsx               # Navigation sidebar
│   ├── SimulationModal.tsx       # Simulation modal
│   ├── SlidePresentation.tsx     # Slide system
│   ├── Toast.tsx                 # Notification component
│   ├── UserMenu.tsx              # User dropdown menu
│   └── simulator/                # Simulation components
│       ├── CircularMotionGraph.tsx
│       ├── EnergySimulation.tsx
│       ├── PendulumSimulation.tsx
│       └── ResonanceSimulation.tsx
├── contexts/                     # React contexts
│   └── AuthContext.tsx           # Authentication context
├── hooks/                        # Custom React hooks
│   └── useProgress.ts            # Progress tracking hook
├── lib/                          # Utility libraries
│   └── mongodb.ts                # Database connection
├── models/                       # Mongoose models
│   ├── Chapter.ts                # Chapter schema
│   ├── Exercise.ts               # Exercise schema
│   ├── User.ts                   # User schema
│   └── UserProgress.ts           # Progress schema
├── public/                       # Static assets
│   └── images/
├── scripts/                      # Utility scripts
│   ├── create-admin.js           # Create admin user
│   ├── generate-exercises.js     # Generate 400 exercises
│   ├── seed-chapters.js          # Seed chapters data
│   └── update-simulation.js      # Update simulation data
├── types/                        # TypeScript type definitions
│   └── Chapter.ts
├── .env.local                    # Environment variables (git-ignored)
├── .gitignore
├── next.config.js                # Next.js configuration
├── package.json
├── postcss.config.js
├── tailwind.config.js            # Tailwind CSS config
└── tsconfig.json                 # TypeScript config
```

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký user mới
- `POST /api/auth/login` - Đăng nhập user
- `GET /api/auth/verify` - Verify JWT token

### Chapters & Lessons
- `GET /api/chapters` - Lấy danh sách chapters
- `GET /api/chapters/[id]` - Lấy chi tiết chapter theo ID

### Exercises
- `GET /api/exercises` - Lấy tất cả bài tập
- `POST /api/exercises` - Generate bài tập (internal)
- `DELETE /api/exercises` - Xóa tất cả bài tập

### Progress Tracking
- `GET /api/progress` - Lấy tiến độ của user
- `POST /api/progress` - Cập nhật tiến độ bài học
- `GET /api/search` - Tìm kiếm nội dung

### Admin APIs
- `GET /api/admin/dashboard/stats` - Thống kê dashboard
- `GET /api/admin/dashboard/recent-users` - Danh sách users (paginated)
- `GET /api/admin/exercises` - Lấy danh sách bài tập
- `POST /api/admin/exercises` - Thêm bài tập mới
- `PUT /api/admin/exercises/[id]` - Cập nhật bài tập
- `DELETE /api/admin/exercises/[id]` - Xóa bài tập
- `DELETE /api/admin/users/[id]` - Xóa user

## 📚 Nội dung học tập

### Chương 1: Dao động

#### Bài 1: Mô tả dao động 〰️
- Khái niệm dao động
- Các đại lượng đặc trưng: Biên độ, chu kỳ, tần số
- Pha dao động
- 100 câu hỏi đa dạng

#### Bài 2: Phương trình dao động điều hoà 📐
- Phương trình dao động điều hòa
- Vận tốc và gia tốc trong dao động
- Mối liên hệ giữa các đại lượng
- 100 câu hỏi với giải thích chi tiết

#### Bài 3: Năng lượng trong dao động điều hoà ⚡
- Động năng trong dao động
- Thế năng trong dao động
- Cơ năng và sự bảo toàn cơ năng
- 100 câu hỏi thực tế

#### Bài 4: Dao động tắt dần và cộng hưởng 📉
- Dao động tắt dần
- Dao động cưỡng bức
- Hiện tượng cộng hưởng
- 100 câu hỏi ứng dụng

### Tính năng bài học
- **Interactive Slides**: Navigation mượt mà với keyboard/mouse
- **Formula Rendering**: MathJax LaTeX rendering
- **Simulations**: Mô phỏng tương tác
- **Progress Tracking**: Lưu tiến độ từng slide
- **Examples & Exercises**: Bài tập thực hành tích hợp

## 🔧 Scripts có sẵn

```bash
# Development
npm run dev          # Chạy development server (http://localhost:3000)
npm run build        # Build production
npm start            # Chạy production server

# Code Quality
npm run lint         # Kiểm tra ESLint
npm run type-check   # Kiểm tra TypeScript

# Database Setup
node scripts/create-admin.js        # Tạo admin account
node scripts/seed-chapters.js       # Seed chapters
node scripts/generate-exercises.js  # Generate 400 exercises
```

## 🌟 Hướng dẫn sử dụng

### Cho Học sinh

1. **Đăng ký/Đăng nhập**: Tạo tài khoản hoặc đăng nhập
2. **Chọn bài học**: Vào trang Lessons và chọn bài muốn học
3. **Học qua slides**: Dùng mũi tên hoặc nút để điều hướng
4. **Xem mô phỏng**: Click vào các nút simulation để xem demo
5. **Làm bài tập**: 
   - **Practice**: Luyện tập ngẫu nhiên 24 câu
   - **Exercises**: Làm 40 câu theo từng bài
6. **Theo dõi tiến độ**: Xem progress bar và tích xanh

### Cho Admin

1. **Đăng nhập admin**: Sử dụng tài khoản admin
2. **Vào Dashboard**: `/admin/dashboard`
3. **Quản lý Users**: 
   - Xem danh sách users
   - Xóa users (đơn lẻ hoặc hàng loạt)
   - Phân trang 10 users/trang
4. **Quản lý Bài tập**: `/admin/exercises`
   - Thêm bài tập mới
   - Sửa bài tập có sẵn
   - Xóa bài tập
   - Lọc theo bài học, độ khó
   - Tìm kiếm câu hỏi
   - Phân trang 20 bài/trang

## 🚀 Deployment

### Vercel (Recommended)
1. Push code lên GitHub
2. Import project vào Vercel
3. Cấu hình environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`
4. Deploy tự động

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build và run:
```bash
docker build -t physics-book .
docker run -p 3000:3000 physics-book
```

## 🤝 Contributing

1. Fork project
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📝 License

Distributed under the MIT License.

## 👨‍💻 Author

**AzuraDev202**
- GitHub: [@AzuraDev202](https://github.com/AzuraDev202)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework for Production
- [Tailwind CSS](https://tailwindcss.com/) - Utility-First CSS Framework
- [MongoDB Atlas](https://www.mongodb.com/atlas) - Cloud Database Platform
- [MathJax](https://www.mathjax.org/) - Beautiful Math in All Browsers
- [Chân trời sáng tạo](https://nxbgd.vn/) - Educational Curriculum

---

**⭐ Star repository nếu project hữu ích cho bạn!**

## 📊 Project Stats

- **Lines of Code**: 10,000+
- **Components**: 20+
- **API Endpoints**: 15+
- **Database Models**: 4
- **Total Exercises**: 400
- **Lessons**: 4
- **Simulations**: 4

## 🔄 Version History

### Version 1.0 (Current)
- ✅ Complete authentication system
- ✅ 4 interactive lessons with slides
- ✅ 400 exercises with 3 difficulty levels
- ✅ Admin dashboard and management
- ✅ Progress tracking system
- ✅ Interactive simulations
- ✅ Responsive design with dark mode
- ✅ Real-world context exercises

## 📁 Cấu trúc dự án

```
physics-book-nextjs/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/                 # Authentication endpoints
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── verify/
│   │   └── progress/             # Progress tracking API
│   ├── lesson/[id]/              # Dynamic lesson pages
│   ├── lessons/                  # Lessons listing page
│   ├── practice/                 # Practice exercises
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Homepage
├── components/                   # Reusable components
│   ├── AuthModal.tsx             # Login/Register modal
│   ├── SlidePresentation.tsx     # Slide presentation system
│   ├── Toast.tsx                 # Notification component
│   ├── UserMenu.tsx              # User dropdown menu
│   └── Math.tsx                  # MathJax wrapper
├── contexts/                     # React contexts
│   └── AuthContext.tsx           # Authentication context
├── hooks/                        # Custom React hooks
│   └── useProgress.ts            # Progress tracking hook
├── lib/                          # Utility libraries
│   └── mongodb.ts                # Database connection
├── models/                       # Database models
│   ├── User.ts                   # User schema
│   └── UserProgress.ts           # Progress schema
└── public/                       # Static assets
```

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký user mới
- `POST /api/auth/login` - Đăng nhập user
- `GET /api/auth/verify` - Verify JWT token

### Progress Tracking
- `GET /api/progress` - Lấy tiến độ học tập của user
- `POST /api/progress` - Cập nhật tiến độ bài học

## 📚 Nội dung học tập

### Chương 1: Dao động
1. **Bài 1**: Mô tả dao động - Khái niệm cơ bản và các đại lượng đặc trưng
2. **Bài 2**: Phương trình dao động điều hoà - Nghiên cứu phương trình vi phân
3. **Bài 3**: Năng lượng trong dao động điều hoà - Phân tích động năng và thế năng
4. **Bài 4**: Dao động tắt dần và hiện tượng cộng hưởng - Dao động có ma sát

### Tính năng bài học
- **Interactive slides** với animations mượt mà
- **Formula rendering** với MathJax LaTeX
- **Examples và exercises** tương tác
- **Progress tracking** từng bài chi tiết
- **Practice mode** với câu hỏi trắc nghiệm

## 🔧 Scripts có sẵn

```bash
npm run dev          # Chạy development server
npm run build        # Build production
npm start            # Chạy production server  
npm run lint         # Kiểm tra ESLint
npm run lint:fix     # Tự động fix ESLint errors
npm run type-check   # Kiểm tra TypeScript
npm run clean        # Xóa build cache
```

## 🌟 Tính năng đặc biệt

### 🔐 Authentication System
- **JWT-based authentication** với MongoDB Atlas
- **Secure password hashing** với bcrypt
- **Auto login persistence** với localStorage
- **Protected routes** cho user đã đăng nhập
- **User profile** với avatar và thông tin cá nhân

### 📊 Progress Tracking
- **Real-time progress** lưu trữ trên cloud
- **Completion badges** hiển thị trực quan
- **Time tracking** thời gian học từng bài
- **Progress analytics** với charts và statistics
- **Auto-completion** khi hoàn thành slides

### 🎨 UI/UX Excellence  
- **Multi-theme support** (light/dark/sepia)
- **Responsive design** hoàn hảo trên mọi device
- **Smooth animations** và transitions
- **Toast notifications** với custom styling
- **Keyboard shortcuts** cho power users

## 🚀 Deployment

### Vercel (Recommended)
1. Push code lên GitHub
2. Connect repository với Vercel
3. Cấu hình environment variables
4. Deploy tự động

## 🤝 Contributing

1. Fork project
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👨‍💻 Author

**Project Maintainer**
- GitHub: [@yourusername](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework for Production
- [Tailwind CSS](https://tailwindcss.com/) - Utility-First CSS Framework  
- [MongoDB Atlas](https://www.mongodb.com/atlas) - Cloud Database Platform
- [MathJax](https://www.mathjax.org/) - Beautiful Math in All Browsers
- [Chân trời sáng tạo](https://chantroihcm.edu.vn/) - Educational Curriculum

---

**⭐ Star repository nếu project hữu ích cho bạn!**

## 📊 Project Stats

- **Lines of Code**: 10,000+
- **Components**: 20+
- **API Endpoints**: 15+
- **Database Models**: 4
- **Total Exercises**: 400
- **Lessons**: 4
- **Simulations**: 4

## 🔄 Version History

### Version 1.0 (Current)
- ✅ Complete authentication system
- ✅ 4 interactive lessons with slides
- ✅ 400 exercises with 3 difficulty levels
- ✅ Admin dashboard and management
- ✅ Progress tracking system
- ✅ Interactive simulations
- ✅ Responsive design with dark mode
- ✅ Real-world context exercises