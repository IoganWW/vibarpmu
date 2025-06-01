# PMU Master Platform 🎨

> Professional Permanent Makeup Learning Platform with multilingual support and secure payment integration

## 📋 Project Overview

A comprehensive web platform for permanent makeup education, combining personal branding showcase with online course sales. The platform serves both as a portfolio for demonstrating high-quality PMU work (eyebrows and lips) and as an educational hub offering offline personal training and online video courses.

## ✨ Key Features

### 🎯 Core Functionality
- **Personal Brand Showcase** - Portfolio of professional PMU work
- **Course Sales Platform** - Online courses for eyebrows and lips training
- **Secure Payment Integration** - LiqPay payment gateway
- **Multi-language Support** - Ukrainian, English, Bulgarian, Turkish
- **User Authentication** - JWT-based secure authentication
- **Protected Content** - Course access control and progress tracking

### 🔐 Authentication & Authorization
- User registration and login system
- JWT token-based authentication
- Protected routes for user profiles and premium content
- Course access verification (`checkCourse` API)

### 🌍 Internationalization
- 4 language support (UA, EN, BG, TR)
- Language prefix in URLs (`/en/courses`, `/ua/courses`)
- Context-based language provider
- Dynamic content translation

### 📚 Course Management
- **Eyebrows Course** - 10+ video lessons
- **Lips Course** - 10+ video lessons
- Course progress tracking
- Secure video content delivery

## 🛠 Tech Stack

### Frontend
- **React** - UI library with hooks and context
- **Vite** - Modern build tool and development server
- **React Router** - Client-side routing with language prefixes
- **Context API** - State management (AuthProvider, LangProvider)

### Backend
- **Node.js** - Runtime environment
- **Express.js 4** - Web application framework
- **MongoDB** - NoSQL database
- **JWT** - JSON Web Tokens for authentication
- **Mongoose** - MongoDB object modeling

### DevOps & Deployment
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Render** - Cloud deployment platform
- **Git** - Version control (GitHub & Bitbucket)

## 📊 Database Schema

### User Model
```javascript
{
  name: { type: String, required: true },
  surname: { type: String, required: true },
  ageGroup: { type: String },
  phone: { type: String, required: true },
  country: { type: String },
  city: { type: String },
  experience: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  termsAccepted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  history: [{
    phone: { type: String, required: true },
    country: { type: String },
    city: { type: String },
    updateAt: { type: Date, default: Date.now },
  }],
  paidCourses: {
    type: [String],
    default: []
  },
}
```

### Course Model
```javascript
{
  id: String, // 'brows' | 'lips'
  ua: {
    title: String,
    description: String
  },
  en: {
    title: String,
    description: String
  },
  bg: {
    title: String,
    description: String
  },
  tr: {
    title: String,
    description: String
  },
  icon: String,
  lessons: [LessonSchema]
}
```
### Lesson Model
```javascript
{
  id: String, 
  videoUrl: String,
  posterImage: String,
  duration: String,
  materials: String,
  ua: {
    title: String,
    description: String
  },
  en: {
    title: String,
    description: String
  },
  bg: {
    title: String,
    description: String
  },
  tr: {
    title: String,
    description: String
  }
}
```

### Course Progress Model
```javascript
{
  userId: {
    type: [Object],
    ref: 'User',
    required: true
  },
  courseId: {
    type: String,
    required: true
  },
  completedLessons: [String]
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Docker & Docker Compose

### Installation & Setup

#### 1. Clone Repository
```bash
git clone https://github.com/IoganWW/vibarpmu
cd pmu-platform
```

#### 2. Environment Variables
Create `.env` files in both client and server directories:

**Server `.env`:**
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pmu-platform
JWT_SECRET=your-jwt-secret-key
LIQPAY_PUBLIC_KEY=your-liqpay-public-key
LIQPAY_PRIVATE_KEY=your-liqpay-private-key
CLIENT_URL=http://localhost:3000
```

**Client `.env`:**
```env
VITE_API_URL=http://localhost:5000/api
VITE_LIQPAY_PUBLIC_KEY=your-liqpay-public-key
```

#### 3. Docker Setup (Recommended)
```bash
# Build and run with Docker Compose
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop containers
docker-compose down
```

#### 4. Manual Setup (Alternative)
```bash
# Install server dependencies
cd server
npm install
npm run dev

# Install client dependencies (new terminal)
cd client
npm install
npm run dev
```

## 🔧 Available Scripts

### Docker Commands
```bash
# Build and start all services
docker-compose up --build

# Start existing containers
docker-compose up

# Stop all services
docker-compose down

# View logs
docker-compose logs
```

### Development Commands
```bash
# Server (from /server directory)
npm run dev          # Start development server
npm start           # Start production server
npm run test        # Run tests

# Client (from /client directory)
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Courses
- `GET /api/courses/:courseId` - Purchase course
- `GET /api/courses/:courseId/progress` - Get course progress
- `POST /api/courses/:courseId/lessons/:lessonId/progress` - Get lesson progress

### User Profile
- `GET /api/users/profile` - Get user profile
- `POST /api/users/profile` - Update user profile
- `POST /api//users/profile/remove-course/:courseId` - Remove course

### Payment
- `POST /api/liqpay/create-payment` - Process LiqPay payment
- `POST /api/liqpay/callback` - Payment callback handler

## 🔒 Security Features

- **Password Hashing** - bcrypt encryption
- **JWT Authentication** - Secure token-based auth
- **CORS Configuration** - Cross-origin request handling
- **Input Validation** - Server-side validation
- **Protected Routes** - Access control for premium content

## 🌍 Deployment

### Production Environment
- **Client**: Deployed on Render as static site
- **Server**: Deployed on Render as web service
- **Database**: MongoDB Atlas cloud database

### Environment Configuration
- Separate staging and production environments
- Environment-specific configuration files
- Secure environment variable management

## 📱 Responsive Design

- Mobile-first approach
- Cross-browser compatibility
- Adaptive layouts for all screen sizes
- Touch-friendly interface

## 🔄 Development Workflow

1. Feature development in separate branches
2. Code review process
3. Automated testing
4. Staging environment testing
5. Production deployment

## 📈 Future Enhancements

- [ ] Video streaming optimization
- [ ] Mobile application
- [ ] Advanced analytics dashboard
- [ ] Email notifications system
- [ ] Social sharing features
- [ ] Certificate generation

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is proprietary and confidential.

---

**Developed by Ivan Kulinich** | [GitHub](https://github.com/IoganWW/vibarpmu) | [Email](mailto:ivankulini4@gmail.com)