# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-12-10

### Added
- **Authentication System**
  - JWT-based login/register with MongoDB
  - Password hashing with bcryptjs
  - Protected routes and role-based access
  - Auto login persistence

- **Learning System**
  - 4 interactive lessons with slide presentations
  - MathJax integration for LaTeX formulas
  - Interactive simulations (Oscillation, Pendulum, Energy, Resonance)
  - Progress tracking with real-time updates
  - Toast notifications for lesson completion

- **Exercise System**
  - 400 total exercises (100 per lesson)
  - 3 difficulty levels: Basic, Intermediate, Advanced
  - 3 categories: Theory, Practical, Calculation
  - Practice mode: Random 24 questions from 4 lessons
  - Exercise mode: 40 questions per lesson
  - Real-world context questions
  - Instant feedback with detailed explanations
  - Keyboard shortcuts (1-4) for quick answer selection

- **Admin Dashboard**
  - User management with pagination (10 users/page)
  - Exercise management with CRUD operations
  - Bulk user deletion
  - Exercise filtering by lesson and difficulty
  - Search functionality
  - Pagination for exercises (20 items/page)
  - Statistics dashboard with charts

- **UI/UX Features**
  - Dark mode support
  - Fully responsive design (mobile, tablet, desktop)
  - Modern UI with gradients and shadows
  - Smooth animations and transitions
  - User menu with avatar and dropdown
  - Progress bars and completion badges

- **Database Models**
  - User model with authentication
  - Chapter model for lessons
  - Exercise model with full schema
  - UserProgress model for tracking

- **Scripts**
  - `create-admin.js` - Create admin accounts
  - `seed-chapters.js` - Seed lesson data
  - `generate-exercises.js` - Generate 400 exercises
  - `update-simulation.js` - Update simulation data

### Technical
- Next.js 14 with App Router
- TypeScript for type safety
- MongoDB Atlas with Mongoose ODM
- Tailwind CSS for styling
- API Routes for backend
- Server-side rendering and client components

### Security
- JWT token authentication
- Password hashing
- Environment variables for secrets
- Protected API routes
- Role-based access control

## [0.5.0] - 2025-11-22

### Added
- Initial project setup
- Basic lesson structure
- Simple authentication
- MongoDB connection

## [0.1.0] - 2025-10-22

### Added
- Project initialization
- Next.js 14 setup
- Basic components
- Tailwind CSS configuration
