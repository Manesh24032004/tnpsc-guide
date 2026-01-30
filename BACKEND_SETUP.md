# TNPSC Guide - Backend Setup Guide

This document provides instructions for setting up a Node.js + MongoDB backend after exporting from Lovable.

## Project Structure After Export

```
tnpsc-guide/
├── frontend/                 # React frontend (this Lovable export)
│   ├── src/
│   │   ├── services/
│   │   │   └── api/          # API abstraction layer
│   │   │       ├── types.ts
│   │   │       ├── config.ts
│   │   │       ├── authService.ts
│   │   │       ├── documentService.ts
│   │   │       └── imageService.ts
│   │   └── ...
│   └── package.json
│
└── backend/                  # Node.js backend (create this)
    ├── src/
    │   ├── config/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── models/
    │   ├── routes/
    │   └── server.js
    └── package.json
```

## MongoDB Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (hashed, required),
  name: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

### UserRoles Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  role: String (enum: ['admin', 'user']),
  createdAt: Date
}
```

### Documents Collection
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String,
  category: String (enum: ['syllabus', 'previous-papers', 'notes', 'books', 'tirukural', 'tamil-scholars']),
  subcategory: String,
  filePath: String (required),
  fileName: String (required),
  fileSize: Number,
  downloadCount: Number (default: 0),
  uploadedBy: ObjectId (ref: Users),
  createdAt: Date,
  updatedAt: Date
}
```

### Images Collection
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String,
  category: String (enum: ['logos', 'tamil-scholars', 'book-covers', 'poets', 'standards', 'subjects', 'carousel', 'general']),
  subcategory: String,
  fileName: String (required),
  filePath: String (required),
  fileSize: Number,
  createdAt: Date
}
```

## Backend API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/auth/me` | Get current user |
| POST | `/api/auth/refresh` | Refresh token |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users (admin) |
| GET | `/api/users/:id` | Get user by ID |
| GET | `/api/users/roles/:userId` | Get user role |
| PUT | `/api/users/roles/:userId` | Update user role (admin) |

### Documents
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/documents` | Get all documents |
| GET | `/api/documents/category/:category` | Get documents by category |
| GET | `/api/documents/:id` | Get document by ID |
| POST | `/api/documents` | Upload document (admin) |
| PATCH | `/api/documents/:id` | Update document (admin) |
| DELETE | `/api/documents/:id` | Delete document (admin) |
| POST | `/api/documents/:id/download` | Increment download count |

### Images
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/images` | Get all images |
| GET | `/api/images/category/:category` | Get images by category |
| POST | `/api/images/upload` | Upload image (admin) |
| DELETE | `/api/images/:id` | Delete image (admin) |

### Files
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/files/:path` | Serve file |
| POST | `/api/files/upload` | Upload file |
| DELETE | `/api/files/delete` | Delete file |

## Quick Start - Backend Setup

### 1. Initialize Backend Project
```bash
mkdir backend && cd backend
npm init -y
npm install express mongoose bcryptjs jsonwebtoken multer cors dotenv helmet
npm install -D nodemon
```

### 2. Create Environment File (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tnpsc-guide
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
UPLOAD_PATH=./uploads
```

### 3. Create Server Entry Point (src/server.js)
```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/documents', require('./routes/documents'));
app.use('/api/images', require('./routes/images'));
app.use('/api/files', require('./routes/files'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### 4. Create User Model (src/models/User.js)
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  name: { type: String, required: true },
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

### 5. Create Auth Controller (src/controllers/authController.js)
```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const UserRole = require('../models/UserRole');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = await User.create({ email, password, name });
    await UserRole.create({ userId: user._id, role: 'user' });
    
    const token = signToken(user._id);
    res.status(201).json({
      success: true,
      data: { user: { _id: user._id, email, name }, token }
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    
    const token = signToken(user._id);
    res.json({
      success: true,
      data: { user: { _id: user._id, email: user.email, name: user.name }, token }
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
```

## Switching Frontend to MongoDB Backend

After setting up your backend, update the frontend configuration:

### 1. Update `src/services/api/config.ts`
```typescript
// Change this to true
export const USE_MONGODB_BACKEND = true;

// Set your backend URL
export const MONGODB_API_URL = 'https://your-backend-url.com/api';
```

### 2. Update Environment Variables
Create/update `.env` in frontend:
```env
VITE_API_URL=https://your-backend-url.com/api
```

## Deployment Options

### Frontend (React)
- **Vercel**: `vercel deploy`
- **Netlify**: Connect GitHub repo
- **Railway**: `railway up`

### Backend (Node.js)
- **Render**: Free tier available
- **Railway**: Easy deployment
- **Heroku**: `git push heroku main`
- **DigitalOcean App Platform**

### Database (MongoDB)
- **MongoDB Atlas**: Free tier (512MB)
- **Self-hosted on VPS**

## File Storage Options
Since MongoDB doesn't handle files directly, use:
- **Cloudinary**: Image/video hosting
- **AWS S3**: General file storage
- **Local disk**: For development/small scale

Update the file upload paths in your backend accordingly.
