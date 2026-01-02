# CourseCrafter AI

AI-Powered Prompt-to-Course Generator with Multilingual Video Content

## 📌 Project Overview

CourseCrafter AI is an intelligent course generation platform that:
- Generates complete courses from a single text prompt
- Creates structured course content with modules and lessons
- Supports multilingual content generation
- Produces AI-narrated instructional videos
- Stores courses user-wise with secure authentication

## 🏗️ Project Structure

```
CourseCrafter_AI/
├── Frontend/          # React + Tailwind UI
├── Backend/           # Node.js + Express API
├── automation/        # n8n workflows
├── docs/             # Documentation
└── README.md
```

## 🛠️ Technology Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- bcrypt

### Automation
- n8n (Workflow Engine)
- AI/LLM Integration
- Text-to-Speech

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB
- n8n

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd CourseCrafter_AI
```

2. **Backend Setup**
```bash
cd Backend
npm install
```

Create `.env` file:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Start backend:
```bash
npm start
```

3. **Frontend Setup**
```bash
cd Frontend
npm install
npm run dev
```

4. **n8n Setup**
```bash
npm install -g n8n
n8n start
```

## 📝 Current Implementation Status

### ✅ Completed Modules

#### Module 1: Authentication
- User registration
- User login
- JWT token generation
- Protected routes
- Session management

#### Module 2: Course Management
- Course creation
- User-wise course storage
- Course listing
- Course status tracking

#### Module 3: Database Models
- User model (with password hashing)
- Course model (with analysis, modules, videos fields)

### 🔄 In Progress

#### Module 3: Prompt Analysis (n8n)
- AI-based prompt analysis
- Structured data extraction
- Backend-n8n integration

### 📋 Planned Modules

- Module 4: Course Planning
- Module 5: Content Generation (RAG)
- Module 6: Translation
- Module 7: Text-to-Speech
- Module 8: Video Generation

## 📊 API Endpoints

### Authentication
```
POST /api/auth/register  - Register new user
POST /api/auth/login     - Login user
GET  /api/auth/me        - Get logged-in user info
```

### Courses
```
POST /api/courses        - Create new course
GET  /api/courses        - Get user's courses
```

## 🎯 Features

- ✅ Secure user authentication
- ✅ JWT-based session management
- ✅ User-wise course storage
- ✅ Clean, simple UI design
- ✅ Responsive dashboard
- 🔄 AI prompt analysis
- 📋 Course structure generation
- 📋 Multilingual content
- 📋 Video generation

## 🤝 Contributing

This is a final year project. For any queries, contact the development team.

## 📄 License

This project is developed for educational purposes.

## 👨‍💻 Development Team

- [Your Name]
- Guide: [Guide Name]
- Institution: [Your College]
