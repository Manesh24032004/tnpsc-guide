# TNPSC WIZARD
## A Smart Digital Learning Platform

---

### Project Report

**Submitted by:** [Your Name]  
**Register Number:** [Your Register Number]  
**Department:** [Your Department]  
**College:** [Your College Name]  
**University:** [Your University Name]  
**Academic Year:** 2025-2026

---

## Table of Contents

1. [Abstract](#1-abstract)
2. [Introduction](#2-introduction)
3. [System Analysis](#3-system-analysis)
   - 3.1 [Existing System](#31-existing-system)
   - 3.2 [Proposed System](#32-proposed-system)
   - 3.3 [Working Principle](#33-working-principle)
4. [System Specifications](#4-system-specifications)
   - 4.1 [Hardware Specifications](#41-hardware-specifications)
   - 4.2 [Software Specifications](#42-software-specifications)
5. [System Design and Development](#5-system-design-and-development)
   - 5.1 [System Design Diagram](#51-system-design-diagram)
   - 5.2 [Input and Output Design](#52-input-and-output-design)
6. [Module Description](#6-module-description)
7. [Data Flow Diagram](#7-data-flow-diagram)
8. [Implementation](#8-implementation)
9. [Conclusion](#9-conclusion)
10. [Future Enhancement](#10-future-enhancement)
11. [Sample Coding](#11-sample-coding)
12. [Screenshots](#12-screenshots)
13. [Book References](#13-book-references)

---

## 1. Abstract

**TNPSC Wizard** is a comprehensive web-based digital learning platform designed to assist aspirants preparing for Tamil Nadu Public Service Commission (TNPSC) examinations. The platform provides a centralized repository for study materials, previous year question papers, syllabus information, interactive quizzes, and AI-powered assistance.

The application is built using modern web technologies including **React.js** with **TypeScript** for the frontend, styled with **Tailwind CSS** for responsive design, and powered by a **Node.js** backend with **MongoDB** database for efficient data management. The system features user authentication, role-based access control, document management, and an admin dashboard for content administration.

Key features include:
- Group-wise syllabus management (G1, G2, G2A, G4)
- Previous year question papers organized by year and group
- Tamil literature sections (Tirukural, Tamil Scholars/Poets)
- School books repository (6th to 12th standard)
- Interactive quiz modules (Tamil, General Studies, Mathematics)
- AI-powered study assistant (TNPSC Wizard AI)
- Admin panel for content management

The platform aims to democratize TNPSC preparation by providing free access to quality study materials in a user-friendly interface.

**Keywords:** TNPSC, E-Learning, React, Node.js, MongoDB, Digital Education, Tamil Nadu Government Exams

---

## 2. Introduction

### 2.1 Background

The Tamil Nadu Public Service Commission (TNPSC) conducts various competitive examinations for recruitment to civil services and posts in the state of Tamil Nadu, India. With thousands of aspirants competing annually, there is a significant demand for comprehensive and accessible study resources.

### 2.2 Problem Statement

Traditional TNPSC preparation methods face several challenges:
- Scattered study materials across multiple sources
- Difficulty in accessing previous year question papers
- Lack of organized syllabus information
- High cost of coaching institutes
- Limited availability of Tamil language resources
- No centralized platform for all exam groups

### 2.3 Objective

The primary objectives of TNPSC Wizard are:

1. **Centralized Resource Hub:** Create a single platform containing all TNPSC-related study materials
2. **Accessibility:** Provide free access to quality educational content
3. **Organization:** Categorize materials by exam groups, subjects, and topics
4. **Interactivity:** Include quiz modules for self-assessment
5. **Tamil Literature:** Preserve and provide access to Tamil literary works
6. **AI Assistance:** Integrate AI-powered study guidance
7. **Mobile Responsiveness:** Ensure accessibility across all devices

### 2.4 Scope

The project encompasses:
- User registration and authentication system
- Document upload and management system
- Syllabus viewer for multiple exam groups
- Previous papers repository
- School books section (Class 6-12)
- Tamil literature modules (Tirukural, Poets)
- Quiz modules with scoring
- Admin dashboard for content management
- Responsive design for mobile and desktop

---

## 3. System Analysis

### 3.1 Existing System

#### Current Scenario

The existing systems for TNPSC preparation include:

1. **Official TNPSC Website:**
   - Limited to notifications and basic syllabus
   - No study materials provided
   - Complex navigation structure

2. **Private Coaching Websites:**
   - Expensive subscription models
   - Limited free content
   - Inconsistent quality

3. **PDF Sharing Groups:**
   - Unorganized content
   - Copyright issues
   - No verification of accuracy

4. **YouTube Channels:**
   - Time-consuming video format
   - Difficult to revise quickly
   - No structured learning path

#### Disadvantages of Existing System

| Problem | Description |
|---------|-------------|
| Fragmentation | Study materials scattered across multiple platforms |
| Cost | Premium content locked behind paywalls |
| Accessibility | Poor mobile experience on most platforms |
| Organization | No proper categorization by exam groups |
| Verification | Unverified and outdated content |
| Language | Limited Tamil language interface support |
| Interactivity | Lack of self-assessment tools |

### 3.2 Proposed System

#### Overview

TNPSC Wizard is a modern, full-stack web application that addresses all shortcomings of existing systems by providing:

1. **Unified Platform:** All TNPSC resources in one place
2. **Free Access:** No subscription or payment required
3. **Organized Structure:** Content categorized by exam groups
4. **Bilingual Support:** Tamil and English interface
5. **Interactive Learning:** Quiz modules for practice
6. **AI Integration:** Smart study assistant
7. **Admin Control:** Verified content management

#### Advantages of Proposed System

| Feature | Benefit |
|---------|---------|
| Single Platform | One-stop solution for all preparation needs |
| Free Access | Democratizes education for all aspirants |
| Modern UI/UX | Intuitive and responsive design |
| Group-wise Organization | Easy navigation by exam category |
| Quiz System | Self-assessment capability |
| AI Assistant | Personalized study guidance |
| Admin Panel | Quality control of content |
| Mobile First | Accessible on any device |

#### Features Comparison

| Feature | Existing System | Proposed System |
|---------|-----------------|-----------------|
| Centralized Materials | ❌ No | ✅ Yes |
| Free Access | ❌ Limited | ✅ Full |
| Mobile Responsive | ❌ Poor | ✅ Excellent |
| Quiz Modules | ❌ Rare | ✅ Multiple |
| AI Assistance | ❌ No | ✅ Yes |
| Tamil Literature | ❌ Limited | ✅ Comprehensive |
| Admin Dashboard | ❌ No | ✅ Full-featured |

### 3.3 Working Principle

#### System Architecture

The TNPSC Wizard follows a **three-tier architecture**:

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION TIER                         │
│              (React.js + TypeScript + Tailwind CSS)          │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ Landing  │  │Dashboard │  │  Admin   │  │  Quiz    │    │
│  │  Page    │  │   Page   │  │  Panel   │  │ Modules  │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION TIER                          │
│                  (Node.js + Express.js)                      │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │   Auth   │  │ Document │  │  Image   │  │   User   │    │
│  │Controller│  │Controller│  │Controller│  │Controller│    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      DATA TIER                               │
│                      (MongoDB)                               │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │  Users   │  │Documents │  │  Images  │  │UserRoles │    │
│  │Collection│  │Collection│  │Collection│  │Collection│    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
└─────────────────────────────────────────────────────────────┘
```

#### Request-Response Flow

1. **User Request:** User interacts with the React frontend
2. **API Call:** Frontend makes HTTP request to Node.js backend
3. **Authentication:** JWT token validates user identity
4. **Business Logic:** Controllers process the request
5. **Database Query:** MongoDB operations are performed
6. **Response:** Data returned through the API
7. **UI Update:** React updates the interface

#### Authentication Flow

```
User Login → Credentials Validation → JWT Generation → 
Token Storage → Protected Route Access → Token Verification → 
Access Granted/Denied
```

---

## 4. System Specifications

### 4.1 Hardware Specifications

#### Development Environment

| Component | Minimum Requirement | Recommended |
|-----------|---------------------|-------------|
| Processor | Intel Core i3 / AMD Ryzen 3 | Intel Core i5 / AMD Ryzen 5 |
| RAM | 4 GB | 8 GB or higher |
| Storage | 50 GB HDD | 256 GB SSD |
| Display | 1366 x 768 resolution | 1920 x 1080 resolution |
| Network | 10 Mbps Internet | 50 Mbps or higher |

#### Production Server

| Component | Specification |
|-----------|---------------|
| CPU | 2 vCPUs (minimum) |
| RAM | 4 GB (minimum) |
| Storage | 50 GB SSD |
| Bandwidth | Unmetered |
| OS | Ubuntu 22.04 LTS / Windows Server |

#### Client Device Requirements

| Device Type | Minimum Requirement |
|-------------|---------------------|
| Desktop | Modern browser (Chrome 90+, Firefox 88+, Edge 90+) |
| Laptop | 4 GB RAM, Modern browser |
| Tablet | iOS 14+ / Android 10+ |
| Mobile | iOS 14+ / Android 10+ |

### 4.2 Software Specifications

#### Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| HTML5 | 5.0 | Markup structure |
| CSS3 | 3.0 | Styling foundation |
| Tailwind CSS | 3.4.x | Utility-first CSS framework |
| JavaScript | ES2022 | Programming language |
| TypeScript | 5.0+ | Type-safe JavaScript |
| React.js | 18.3.x | UI component library |
| React Router | 6.x | Client-side routing |
| React Query | 5.x | Server state management |
| Vite | 5.x | Build tool and dev server |

#### Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 20.x LTS | JavaScript runtime |
| Express.js | 4.x | Web application framework |
| MongoDB | 7.x | NoSQL database |
| Mongoose | 8.x | MongoDB ODM |
| JWT | - | Authentication tokens |
| Bcrypt.js | 2.x | Password hashing |
| Multer | 1.x | File upload handling |
| CORS | 2.x | Cross-origin requests |
| Helmet | 7.x | Security headers |
| Dotenv | 16.x | Environment variables |

#### Development Tools

| Tool | Purpose |
|------|---------|
| Visual Studio Code | Code editor |
| Git | Version control |
| GitHub | Repository hosting |
| Postman | API testing |
| MongoDB Compass | Database GUI |
| Chrome DevTools | Debugging |
| ESLint | Code linting |
| Prettier | Code formatting |

#### Deployment Platforms

| Platform | Purpose |
|----------|---------|
| Vercel / Netlify | Frontend hosting |
| Render / Railway | Backend hosting |
| MongoDB Atlas | Database hosting |
| Cloudinary | Image storage |

---

## 5. System Design and Development

### 5.1 System Design Diagram

#### 5.1.1 Use Case Diagram

```
                         ┌─────────────────────────────────────────┐
                         │            TNPSC Wizard System           │
                         │                                         │
    ┌──────┐            │  ┌─────────────────────────────────┐   │
    │      │            │  │         View Landing Page        │   │
    │      │◄───────────┼──┤                                  │   │
    │      │            │  └─────────────────────────────────┘   │
    │      │            │                                         │
    │      │            │  ┌─────────────────────────────────┐   │
    │      │◄───────────┼──┤       Register / Login           │   │
    │      │            │  └─────────────────────────────────┘   │
    │ USER │            │                                         │
    │      │            │  ┌─────────────────────────────────┐   │
    │      │◄───────────┼──┤       View Dashboard             │   │
    │      │            │  └─────────────────────────────────┘   │
    │      │            │                                         │
    │      │            │  ┌─────────────────────────────────┐   │
    │      │◄───────────┼──┤    Download Study Materials      │   │
    │      │            │  └─────────────────────────────────┘   │
    │      │            │                                         │
    │      │            │  ┌─────────────────────────────────┐   │
    │      │◄───────────┼──┤       Attempt Quizzes            │   │
    │      │            │  └─────────────────────────────────┘   │
    │      │            │                                         │
    │      │            │  ┌─────────────────────────────────┐   │
    │      │◄───────────┼──┤      Use AI Assistant            │   │
    └──────┘            │  └─────────────────────────────────┘   │
                         │                                         │
    ┌──────┐            │  ┌─────────────────────────────────┐   │
    │      │◄───────────┼──┤      Manage Users                │   │
    │      │            │  └─────────────────────────────────┘   │
    │      │            │                                         │
    │ADMIN │            │  ┌─────────────────────────────────┐   │
    │      │◄───────────┼──┤    Upload/Delete Documents       │   │
    │      │            │  └─────────────────────────────────┘   │
    │      │            │                                         │
    │      │            │  ┌─────────────────────────────────┐   │
    │      │◄───────────┼──┤     Manage Images                │   │
    │      │            │  └─────────────────────────────────┘   │
    │      │            │                                         │
    │      │            │  ┌─────────────────────────────────┐   │
    │      │◄───────────┼──┤     View Analytics               │   │
    └──────┘            │  └─────────────────────────────────┘   │
                         │                                         │
                         └─────────────────────────────────────────┘
```

#### 5.1.2 Class Diagram

```
┌─────────────────────────┐       ┌─────────────────────────┐
│         User            │       │        UserRole         │
├─────────────────────────┤       ├─────────────────────────┤
│ - _id: ObjectId         │       │ - _id: ObjectId         │
│ - email: String         │1     *│ - userId: ObjectId      │
│ - password: String      │◄──────│ - role: Enum            │
│ - name: String          │       │ - createdAt: Date       │
│ - createdAt: Date       │       └─────────────────────────┘
│ - updatedAt: Date       │
├─────────────────────────┤
│ + register()            │
│ + login()               │
│ + logout()              │
│ + comparePassword()     │
└─────────────────────────┘
            │
            │ 1
            │
            ▼ *
┌─────────────────────────┐       ┌─────────────────────────┐
│       Document          │       │         Image           │
├─────────────────────────┤       ├─────────────────────────┤
│ - _id: ObjectId         │       │ - _id: ObjectId         │
│ - title: String         │       │ - title: String         │
│ - description: String   │       │ - description: String   │
│ - category: String      │       │ - category: String      │
│ - subcategory: String   │       │ - subcategory: String   │
│ - filePath: String      │       │ - fileName: String      │
│ - fileName: String      │       │ - filePath: String      │
│ - fileSize: Number      │       │ - fileSize: Number      │
│ - downloadCount: Number │       │ - createdAt: Date       │
│ - uploadedBy: ObjectId  │       └─────────────────────────┘
│ - createdAt: Date       │
│ - updatedAt: Date       │
├─────────────────────────┤
│ + getAll()              │
│ + getByCategory()       │
│ + upload()              │
│ + update()              │
│ + delete()              │
│ + incrementDownload()   │
└─────────────────────────┘
```

#### 5.1.3 Component Architecture

```
                              App.tsx
                                 │
           ┌─────────────────────┼─────────────────────┐
           │                     │                     │
           ▼                     ▼                     ▼
      Layout/               Routes                  Providers
      ├── Navbar            ├── Landing            ├── QueryClient
      ├── Footer            ├── Auth               ├── ThemeProvider
      └── ScrollToTop       ├── Dashboard          └── ToastProvider
                            ├── Admin
                            ├── Syllabus (G1,G2,G4)
                            ├── PreviousPapers
                            ├── Books
                            ├── Notes
                            ├── Tirukural
                            ├── Poets
                            ├── Quiz (Tamil,GS,Maths)
                            └── TNPSCWizardAI
                                 │
           ┌─────────────────────┼─────────────────────┐
           │                     │                     │
           ▼                     ▼                     ▼
      UI Components         Hooks                  Services
      ├── Button            ├── useAuth            ├── authService
      ├── Card              ├── useDocuments       ├── documentService
      ├── Dialog            ├── useImages          └── imageService
      ├── Input             ├── useTheme
      ├── Table             └── useMobile
      └── ...
```

### 5.2 Input and Output Design

#### 5.2.1 Input Design

**Login Form:**
```
┌────────────────────────────────────────┐
│              User Login                 │
├────────────────────────────────────────┤
│                                        │
│  Email Address:                        │
│  ┌──────────────────────────────────┐  │
│  │ user@example.com                 │  │
│  └──────────────────────────────────┘  │
│                                        │
│  Password:                             │
│  ┌──────────────────────────────────┐  │
│  │ ••••••••••                       │  │
│  └──────────────────────────────────┘  │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │           Sign In                │  │
│  └──────────────────────────────────┘  │
│                                        │
│  Don't have an account? Sign up        │
│                                        │
└────────────────────────────────────────┘
```

**Registration Form:**
```
┌────────────────────────────────────────┐
│           Create Account               │
├────────────────────────────────────────┤
│                                        │
│  Full Name:                            │
│  ┌──────────────────────────────────┐  │
│  │ John Doe                         │  │
│  └──────────────────────────────────┘  │
│                                        │
│  Email Address:                        │
│  ┌──────────────────────────────────┐  │
│  │ john@example.com                 │  │
│  └──────────────────────────────────┘  │
│                                        │
│  Password:                             │
│  ┌──────────────────────────────────┐  │
│  │ ••••••••••                       │  │
│  └──────────────────────────────────┘  │
│                                        │
│  Confirm Password:                     │
│  ┌──────────────────────────────────┐  │
│  │ ••••••••••                       │  │
│  └──────────────────────────────────┘  │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │         Create Account           │  │
│  └──────────────────────────────────┘  │
│                                        │
└────────────────────────────────────────┘
```

**Document Upload Form (Admin):**
```
┌────────────────────────────────────────┐
│          Upload Document               │
├────────────────────────────────────────┤
│                                        │
│  Title:                                │
│  ┌──────────────────────────────────┐  │
│  │ Group 1 Syllabus 2025            │  │
│  └──────────────────────────────────┘  │
│                                        │
│  Description:                          │
│  ┌──────────────────────────────────┐  │
│  │ Official syllabus document for   │  │
│  │ TNPSC Group 1 examination...     │  │
│  └──────────────────────────────────┘  │
│                                        │
│  Category:                             │
│  ┌──────────────────────────────────┐  │
│  │ Syllabus                     ▼   │  │
│  └──────────────────────────────────┘  │
│                                        │
│  Subcategory:                          │
│  ┌──────────────────────────────────┐  │
│  │ Group 1                      ▼   │  │
│  └──────────────────────────────────┘  │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │  📁 Choose File                  │  │
│  │     syllabus-g1-2025.pdf         │  │
│  └──────────────────────────────────┘  │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │          Upload File             │  │
│  └──────────────────────────────────┘  │
│                                        │
└────────────────────────────────────────┘
```

#### 5.2.2 Output Design

**Dashboard View:**
```
┌─────────────────────────────────────────────────────────────────┐
│  🏛️ TNPSC Wizard          🔍 Search...    🔔   👤 Profile      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Welcome, John! 👋                                              │
│  ───────────────────────────────────────                       │
│  Continue your TNPSC preparation journey                        │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   🤖        │  │   📚        │  │   📝        │             │
│  │ Wizard AI   │  │  Syllabus   │  │   Quiz      │             │
│  │ Ask doubts  │  │ G1,G2,G4    │  │ Practice    │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │   📄        │  │   📖        │  │   ✍️        │             │
│  │ Previous    │  │  School     │  │  Study      │             │
│  │  Papers     │  │  Books      │  │  Notes      │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐                               │
│  │   🕉️        │  │   👨‍🎓        │                               │
│  │ Tirukural   │  │   Tamil     │                               │
│  │             │  │  Scholars   │                               │
│  └─────────────┘  └─────────────┘                               │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  © 2025 TNPSC Wizard - A Smart Digital Learning Platform        │
└─────────────────────────────────────────────────────────────────┘
```

**Quiz Result Output:**
```
┌────────────────────────────────────────┐
│           Quiz Results                  │
├────────────────────────────────────────┤
│                                        │
│           🏆 Congratulations!           │
│                                        │
│        Your Score: 85/100              │
│                                        │
│        ████████████░░░ 85%             │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │ Correct Answers:     17          │  │
│  │ Wrong Answers:       3           │  │
│  │ Time Taken:          12:45       │  │
│  └──────────────────────────────────┘  │
│                                        │
│  ┌─────────────┐  ┌─────────────────┐  │
│  │ Try Again   │  │ View Answers    │  │
│  └─────────────┘  └─────────────────┘  │
│                                        │
└────────────────────────────────────────┘
```

---

## 6. Module Description

### 6.1 User Authentication Module

**Purpose:** Manages user registration, login, and session management.

**Features:**
- User registration with email verification
- Secure login with JWT tokens
- Password hashing using bcrypt
- Role-based access control (Admin/User)
- Session persistence with refresh tokens

**Components:**
- `Auth.tsx` - Authentication page
- `useAuth.tsx` - Authentication hook
- `authService.ts` - API service
- `ProtectedRoute.tsx` - Route guard

### 6.2 Dashboard Module

**Purpose:** Main user interface after authentication.

**Features:**
- Welcome card with user name
- Quick access cards to all features
- Notification system
- Search functionality
- Theme toggle (light/dark)

**Components:**
- `Dashboard.tsx` - Main dashboard page
- `WelcomeCard.tsx` - Welcome section
- `ContentGrid.tsx` - Feature cards grid
- `Navbar.tsx` - Navigation header

### 6.3 Syllabus Module

**Purpose:** Displays TNPSC syllabus for different exam groups.

**Features:**
- Group-wise syllabus (G1, G2, G2A, G4)
- PDF viewer integration
- Download functionality
- Topic-wise organization

**Components:**
- `Syllabus.tsx` - Syllabus selection
- `SyllabusG1.tsx` - Group 1 syllabus
- `SyllabusG2.tsx` - Group 2 syllabus
- `SyllabusG4.tsx` - Group 4 syllabus

### 6.4 Previous Papers Module

**Purpose:** Repository of previous year question papers.

**Features:**
- Organization by year
- Organization by exam group
- PDF preview
- Download tracking

**Components:**
- `PreviousPapers.tsx` - Papers listing
- `PapersByYear.tsx` - Year-wise view
- `PapersByGroup.tsx` - Group-wise view
- `DocumentViewer.tsx` - PDF viewer

### 6.5 School Books Module

**Purpose:** Textbooks for classes 6-12 relevant to TNPSC.

**Features:**
- Standard-wise organization (6th-12th)
- Subject categorization
- PDF viewer
- Download functionality

**Components:**
- `BooksStandards.tsx` - Standard selection
- `StandardBooks.tsx` - Books for a standard
- `BooksSection.tsx` - Dashboard section

### 6.6 Study Notes Module

**Purpose:** Curated study notes for various subjects.

**Features:**
- Subject-wise notes
- Topic categorization
- Quick revision materials
- Download option

**Components:**
- `Notes.tsx` - Notes listing page

### 6.7 Tirukural Module

**Purpose:** Complete Tirukural with explanations.

**Features:**
- All 133 chapters (Adhikarams)
- Three sections (Aram, Porul, Inbam)
- Tamil and English text
- Search functionality

**Components:**
- `Tirukural.tsx` - Tirukural viewer

### 6.8 Tamil Scholars Module

**Purpose:** Information about famous Tamil poets and scholars.

**Features:**
- Poet biographies
- Major works
- Historical context
- Related materials

**Components:**
- `Poets.tsx` - Poets listing

### 6.9 Quiz Module

**Purpose:** Interactive self-assessment quizzes.

**Features:**
- Tamil language quiz
- General Studies quiz
- Mathematics quiz
- Score tracking
- Time limits

**Components:**
- `Quiz.tsx` - Quiz selection
- `QuizTamil.tsx` - Tamil quiz
- `QuizGS.tsx` - General Studies quiz
- `QuizMaths.tsx` - Maths quiz

### 6.10 AI Assistant Module

**Purpose:** AI-powered study guidance.

**Features:**
- Natural language queries
- Study recommendations
- Doubt clarification
- Exam tips

**Components:**
- `TNPSCWizardAI.tsx` - AI chat interface

### 6.11 Admin Module

**Purpose:** Content management for administrators.

**Features:**
- User management
- Document upload/delete
- Image management
- Analytics dashboard
- Content moderation

**Components:**
- `Admin.tsx` - Admin dashboard
- `AdminHeader.tsx` - Admin navigation
- `AdminStats.tsx` - Statistics cards
- `FileManager.tsx` - File operations
- `FileUploader.tsx` - Upload interface
- `ImageManager.tsx` - Image operations
- `ImageUploader.tsx` - Image upload
- `UserMonitoring.tsx` - User analytics
- `SyllabusManager.tsx` - Syllabus CRUD

---

## 7. Data Flow Diagram

### 7.1 Level 0 DFD (Context Diagram)

```
                         ┌─────────────────────────┐
                         │                         │
    Login/Register       │                         │      Study Materials
    ─────────────────────►                         ├─────────────────────►
                         │                         │
    Quiz Submission      │      TNPSC Wizard       │      Quiz Results
    ─────────────────────►       System            ├─────────────────────►
                         │                         │
    AI Query             │                         │      AI Response
    ─────────────────────►                         ├─────────────────────►
                         │                         │
           USER          └─────────────────────────┘          USER
                                     │
                                     │
                         ┌───────────┴───────────┐
                         │                       │
    Admin Actions        ▼                       ▼      System Data
    ─────────────────────►  Admin Interface      ├─────────────────────►
                         │                       │
           ADMIN         └───────────────────────┘         ADMIN
```

### 7.2 Level 1 DFD

```
┌────────┐                                              ┌────────────┐
│        │    Credentials    ┌──────────────────┐      │            │
│  USER  ├──────────────────►│ 1.0              │      │  MongoDB   │
│        │                   │ Authentication   │◄─────┤  Database  │
│        │◄──────────────────┤ Process          │─────►│            │
│        │    JWT Token      └──────────────────┘      └────────────┘
│        │                                                    │
│        │                   ┌──────────────────┐            │
│        │    Request        │ 2.0              │            │
│        ├──────────────────►│ Document         │◄───────────┤
│        │                   │ Management       │            │
│        │◄──────────────────┤                  │────────────┤
│        │    Documents      └──────────────────┘            │
│        │                                                    │
│        │                   ┌──────────────────┐            │
│        │    Answers        │ 3.0              │            │
│        ├──────────────────►│ Quiz             │◄───────────┤
│        │                   │ Processing       │            │
│        │◄──────────────────┤                  │────────────┤
│        │    Results        └──────────────────┘            │
│        │                                                    │
│        │                   ┌──────────────────┐            │
│        │    Query          │ 4.0              │            │
│        ├──────────────────►│ AI               │            │
│        │                   │ Assistant        │            │
│        │◄──────────────────┤                  │            │
│        │    Response       └──────────────────┘            │
└────────┘                                                    │
                                                              │
┌────────┐                   ┌──────────────────┐            │
│        │    CRUD           │ 5.0              │            │
│ ADMIN  ├──────────────────►│ Content          │◄───────────┤
│        │                   │ Management       │────────────┘
│        │◄──────────────────┤                  │
│        │    Confirmation   └──────────────────┘
└────────┘
```

### 7.3 Level 2 DFD - Document Management

```
                    ┌─────────────────────────────────────────────┐
                    │           2.0 Document Management            │
                    │                                             │
┌────────┐         │  ┌─────────┐     ┌─────────┐    ┌────────┐ │     ┌────────┐
│        │  Req    │  │  2.1    │     │  2.2    │    │  2.3   │ │     │MongoDB │
│  USER  ├─────────┼─►│ Verify  ├────►│ Fetch   ├───►│ Format │─┼────►│   &    │
│        │         │  │ Request │     │ Data    │    │Response│ │     │Storage │
│        │◄────────┼──┤         │◄────┤         │◄───┤        │◄┼─────┤        │
│        │  Docs   │  └─────────┘     └─────────┘    └────────┘ │     └────────┘
└────────┘         │                                             │
                    │                                             │
┌────────┐         │  ┌─────────┐     ┌─────────┐    ┌────────┐ │
│        │  Upload │  │  2.4    │     │  2.5    │    │  2.6   │ │
│ ADMIN  ├─────────┼─►│Validate ├────►│ Store   ├───►│ Update │─┼────►
│        │         │  │ File    │     │ File    │    │Metadata│ │
│        │◄────────┼──┤         │◄────┤         │◄───┤        │◄┼─────
│        │ Confirm │  └─────────┘     └─────────┘    └────────┘ │
└────────┘         │                                             │
                    └─────────────────────────────────────────────┘
```

---

## 8. Implementation

### 8.1 Development Methodology

The project follows **Agile methodology** with iterative development:

1. **Sprint Planning:** Define features for 2-week sprints
2. **Development:** Code implementation
3. **Code Review:** Peer review and testing
4. **Integration:** Merge features
5. **Testing:** Unit and integration tests
6. **Deployment:** Deploy to staging/production

### 8.2 Project Structure

#### Frontend Structure
```
frontend/
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── placeholder.svg
├── src/
│   ├── assets/
│   │   ├── carousel/
│   │   ├── poets/
│   │   ├── standards/
│   │   └── subjects/
│   ├── components/
│   │   ├── Admin/
│   │   │   ├── AdminHeader.tsx
│   │   │   ├── AdminStats.tsx
│   │   │   ├── ContentModules.tsx
│   │   │   ├── FileManager.tsx
│   │   │   ├── FileUploader.tsx
│   │   │   ├── ImageManager.tsx
│   │   │   ├── ImageUploader.tsx
│   │   │   ├── SyllabusManager.tsx
│   │   │   └── UserMonitoring.tsx
│   │   ├── Dashboard/
│   │   │   ├── BooksSection.tsx
│   │   │   ├── ContentGrid.tsx
│   │   │   ├── SyllabusSection.tsx
│   │   │   └── WelcomeCard.tsx
│   │   ├── Layout/
│   │   │   ├── Footer.tsx
│   │   │   └── Navbar.tsx
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   └── ... (shadcn components)
│   │   ├── BackButton.tsx
│   │   ├── DocumentViewer.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── ScrollToTop.tsx
│   │   └── ThemeToggle.tsx
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   ├── use-theme.tsx
│   │   ├── useAuth.tsx
│   │   ├── useDocuments.tsx
│   │   └── useImages.tsx
│   ├── pages/
│   │   ├── AboutTNPSC.tsx
│   │   ├── Admin.tsx
│   │   ├── AdminLogin.tsx
│   │   ├── Auth.tsx
│   │   ├── BooksStandards.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Landing.tsx
│   │   ├── Notes.tsx
│   │   ├── Poets.tsx
│   │   ├── PreviousPapers.tsx
│   │   ├── Quiz.tsx
│   │   ├── QuizGS.tsx
│   │   ├── QuizMaths.tsx
│   │   ├── QuizTamil.tsx
│   │   ├── StandardBooks.tsx
│   │   ├── Syllabus.tsx
│   │   ├── SyllabusG1.tsx
│   │   ├── SyllabusG2.tsx
│   │   ├── SyllabusG4.tsx
│   │   ├── Tirukural.tsx
│   │   └── TNPSCWizardAI.tsx
│   ├── services/
│   │   └── api/
│   │       ├── authService.ts
│   │       ├── config.ts
│   │       ├── documentService.ts
│   │       ├── imageService.ts
│   │       ├── index.ts
│   │       └── types.ts
│   ├── lib/
│   │   └── utils.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

#### Backend Structure
```
backend/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── documentController.js
│   │   ├── imageController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── admin.js
│   │   └── upload.js
│   ├── models/
│   │   ├── Document.js
│   │   ├── Image.js
│   │   ├── User.js
│   │   └── UserRole.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── documents.js
│   │   ├── images.js
│   │   ├── files.js
│   │   └── users.js
│   └── server.js
├── uploads/
│   ├── documents/
│   └── images/
├── .env
└── package.json
```

### 8.3 Key Implementation Details

#### 8.3.1 Authentication Implementation

**JWT Token Flow:**
1. User submits credentials
2. Server validates against MongoDB
3. Server generates JWT with user ID
4. Token sent to client
5. Client stores token in localStorage
6. Token included in subsequent requests
7. Server verifies token on protected routes

#### 8.3.2 File Upload Implementation

**Document Upload Process:**
1. Admin selects file and enters metadata
2. Frontend validates file type and size
3. FormData sent to backend
4. Multer middleware processes file
5. File saved to storage (local/cloud)
6. Metadata saved to MongoDB
7. Success response returned

#### 8.3.3 Role-Based Access Control

**Permission Matrix:**

| Action | Guest | User | Admin |
|--------|-------|------|-------|
| View Landing | ✅ | ✅ | ✅ |
| Register/Login | ✅ | ✅ | ✅ |
| View Dashboard | ❌ | ✅ | ✅ |
| Download Files | ❌ | ✅ | ✅ |
| Take Quizzes | ❌ | ✅ | ✅ |
| Upload Files | ❌ | ❌ | ✅ |
| Delete Files | ❌ | ❌ | ✅ |
| Manage Users | ❌ | ❌ | ✅ |

### 8.4 Database Implementation

#### MongoDB Collections

**users collection:**
```javascript
{
  _id: ObjectId("..."),
  email: "user@example.com",
  password: "$2a$12$...", // bcrypt hash
  name: "John Doe",
  createdAt: ISODate("2025-01-15T10:30:00Z"),
  updatedAt: ISODate("2025-01-15T10:30:00Z")
}
```

**user_roles collection:**
```javascript
{
  _id: ObjectId("..."),
  userId: ObjectId("..."),
  role: "user", // or "admin"
  createdAt: ISODate("2025-01-15T10:30:00Z")
}
```

**documents collection:**
```javascript
{
  _id: ObjectId("..."),
  title: "Group 1 Syllabus 2025",
  description: "Official syllabus for TNPSC Group 1",
  category: "syllabus",
  subcategory: "group-1",
  filePath: "syllabus/1705312200-abc123.pdf",
  fileName: "G1-Syllabus-2025.pdf",
  fileSize: 524288,
  downloadCount: 150,
  uploadedBy: ObjectId("..."),
  createdAt: ISODate("2025-01-15T10:30:00Z"),
  updatedAt: ISODate("2025-01-15T10:30:00Z")
}
```

**images collection:**
```javascript
{
  _id: ObjectId("..."),
  title: "Bharathiyar Portrait",
  description: "Image of Tamil poet Bharathiyar",
  category: "poets",
  subcategory: "bharathiyar",
  fileName: "bharathiyar.jpg",
  filePath: "poets/bharathiyar.jpg",
  fileSize: 102400,
  createdAt: ISODate("2025-01-15T10:30:00Z")
}
```

---

## 9. Conclusion

### 9.1 Summary

TNPSC Wizard successfully addresses the challenges faced by TNPSC aspirants by providing a comprehensive, free, and user-friendly digital learning platform. The application brings together all essential resources including syllabus, previous papers, school books, study notes, Tamil literature, and interactive quizzes in a single unified platform.

### 9.2 Achievements

1. **Centralized Platform:** Successfully created a one-stop solution for TNPSC preparation
2. **Modern Technology:** Implemented using cutting-edge web technologies
3. **Responsive Design:** Works seamlessly across all devices
4. **Admin Control:** Robust content management system
5. **Free Access:** Democratized access to quality study materials
6. **AI Integration:** Incorporated AI-powered study assistance

### 9.3 Technical Accomplishments

- Built a scalable full-stack architecture
- Implemented secure JWT-based authentication
- Created reusable React component library
- Designed efficient MongoDB schemas
- Developed comprehensive API layer
- Achieved mobile-first responsive design

### 9.4 Impact

The platform has the potential to:
- Help thousands of TNPSC aspirants prepare effectively
- Reduce dependency on expensive coaching
- Preserve and promote Tamil literature
- Provide equal opportunity through free access
- Create a community of learners

---

## 10. Future Enhancement

### 10.1 Short-term Enhancements (6 months)

1. **Offline Mode:**
   - Progressive Web App (PWA) implementation
   - Download materials for offline access
   - Sync progress when online

2. **Enhanced Quiz System:**
   - Adaptive difficulty based on performance
   - Detailed analytics and weak area identification
   - Timed mock tests simulating real exams

3. **Social Features:**
   - Discussion forums for each topic
   - Study groups formation
   - Peer-to-peer doubt clearing

4. **Push Notifications:**
   - Exam date reminders
   - New material alerts
   - Study schedule notifications

### 10.2 Medium-term Enhancements (1 year)

1. **Video Content:**
   - Lecture videos for each subject
   - Topic explanations by experts
   - Integration with YouTube/Vimeo

2. **Personalized Learning:**
   - AI-generated study plans
   - Personalized content recommendations
   - Progress-based material suggestions

3. **Mobile Applications:**
   - Native Android app (React Native)
   - Native iOS app
   - Enhanced mobile experience

4. **Multi-language Support:**
   - Complete Tamil interface
   - Other regional language support
   - Language preference settings

### 10.3 Long-term Enhancements (2+ years)

1. **Gamification:**
   - Achievement badges
   - Leaderboards
   - Daily challenges and rewards

2. **AI Tutor:**
   - Advanced AI for personalized tutoring
   - Voice-based query support
   - Real-time doubt solving

3. **Exam Prediction:**
   - ML-based important topic prediction
   - Probable question patterns
   - Success probability estimation

4. **Collaboration Features:**
   - Live study rooms
   - Screen sharing for group study
   - Mentor connection platform

5. **Analytics Dashboard:**
   - Detailed performance analytics
   - Comparison with other aspirants
   - Time spent analysis

---

## 11. Sample Coding

### 11.1 Frontend Code

#### App.tsx - Main Application Component
```typescript
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton";

// Pages
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Syllabus from "./pages/Syllabus";
import SyllabusG1 from "./pages/SyllabusG1";
import PreviousPapers from "./pages/PreviousPapers";
import Notes from "./pages/Notes";
import BooksStandards from "./pages/BooksStandards";
import Tirukural from "./pages/Tirukural";
import Poets from "./pages/Poets";
import Quiz from "./pages/Quiz";
import QuizTamil from "./pages/QuizTamil";
import QuizGS from "./pages/QuizGS";
import QuizMaths from "./pages/QuizMaths";
import TNPSCWizardAI from "./pages/TNPSCWizardAI";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="tnpsc-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <ScrollToTopButton />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected Routes */}
            <Route path="/home" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/syllabus" element={
              <ProtectedRoute>
                <Syllabus />
              </ProtectedRoute>
            } />
            <Route path="/syllabus/g1" element={
              <ProtectedRoute>
                <SyllabusG1 />
              </ProtectedRoute>
            } />
            <Route path="/previous-papers" element={
              <ProtectedRoute>
                <PreviousPapers />
              </ProtectedRoute>
            } />
            <Route path="/notes" element={
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>
            } />
            <Route path="/books" element={
              <ProtectedRoute>
                <BooksStandards />
              </ProtectedRoute>
            } />
            <Route path="/tirukural" element={
              <ProtectedRoute>
                <Tirukural />
              </ProtectedRoute>
            } />
            <Route path="/poets" element={
              <ProtectedRoute>
                <Poets />
              </ProtectedRoute>
            } />
            <Route path="/quiz" element={
              <ProtectedRoute>
                <Quiz />
              </ProtectedRoute>
            } />
            <Route path="/quiz/tamil" element={
              <ProtectedRoute>
                <QuizTamil />
              </ProtectedRoute>
            } />
            <Route path="/quiz/gs" element={
              <ProtectedRoute>
                <QuizGS />
              </ProtectedRoute>
            } />
            <Route path="/quiz/maths" element={
              <ProtectedRoute>
                <QuizMaths />
              </ProtectedRoute>
            } />
            <Route path="/wizard-ai" element={
              <ProtectedRoute>
                <TNPSCWizardAI />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute adminOnly>
                <Admin />
              </ProtectedRoute>
            } />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
```

#### useAuth.tsx - Authentication Hook
```typescript
import { useState, useEffect, createContext, useContext } from 'react';
import { authService } from '@/services/api';

interface User {
  _id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await authService.getCurrentUser();
      if (response.success && response.data) {
        setUser(response.data.user);
        setIsAdmin(response.data.role === 'admin');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    if (response.success && response.data) {
      setUser(response.data.user);
      const roleResponse = await authService.getUserRole(response.data.user._id);
      setIsAdmin(roleResponse.data?.role === 'admin');
    } else {
      throw new Error(response.error || 'Login failed');
    }
  };

  const register = async (email: string, password: string, name: string) => {
    const response = await authService.register({ email, password, name });
    if (response.success && response.data) {
      setUser(response.data.user);
    } else {
      throw new Error(response.error || 'Registration failed');
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

#### documentService.ts - Document API Service
```typescript
import { USE_MONGODB_BACKEND, MONGODB_API_URL, API_ENDPOINTS } from './config';
import { authService } from './authService';
import type { Document, DocumentUploadRequest, ApiResponse } from './types';

class DocumentService {
  private getHeaders() {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    const token = authService.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  async getDocuments(category?: string): Promise<ApiResponse<Document[]>> {
    try {
      const url = category
        ? `${MONGODB_API_URL}${API_ENDPOINTS.DOCUMENTS_BY_CATEGORY(category)}`
        : `${MONGODB_API_URL}${API_ENDPOINTS.DOCUMENTS}`;
      
      const response = await fetch(url, { headers: this.getHeaders() });
      return await response.json();
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async uploadDocument(request: DocumentUploadRequest): Promise<ApiResponse<Document>> {
    try {
      const formData = new FormData();
      formData.append('file', request.file);
      formData.append('title', request.title);
      formData.append('category', request.category);
      if (request.description) formData.append('description', request.description);
      if (request.subcategory) formData.append('subcategory', request.subcategory);

      const response = await fetch(`${MONGODB_API_URL}${API_ENDPOINTS.DOCUMENTS}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${authService.getToken()}` },
        body: formData,
      });
      return await response.json();
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  async deleteDocument(id: string): Promise<ApiResponse<null>> {
    try {
      const response = await fetch(`${MONGODB_API_URL}${API_ENDPOINTS.DOCUMENTS}/${id}`, {
        method: 'DELETE',
        headers: this.getHeaders(),
      });
      return await response.json();
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  getPublicUrl(filePath: string): string {
    return `${MONGODB_API_URL}/files/${filePath}`;
  }
}

export const documentService = new DocumentService();
```

### 11.2 Backend Code

#### server.js - Express Server Entry Point
```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/documents', require('./routes/documents'));
app.use('/api/images', require('./routes/images'));
app.use('/api/files', require('./routes/files'));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Internal Server Error' });
});

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => {
  console.error('MongoDB Connection Error:', err);
  process.exit(1);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

#### User.js - User Model
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
```

#### Document.js - Document Model
```javascript
const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['syllabus', 'previous-papers', 'notes', 'books', 'tirukural', 'tamil-scholars']
  },
  subcategory: {
    type: String,
    trim: true
  },
  filePath: {
    type: String,
    required: [true, 'File path is required']
  },
  fileName: {
    type: String,
    required: [true, 'File name is required']
  },
  fileSize: {
    type: Number
  },
  downloadCount: {
    type: Number,
    default: 0
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Index for faster queries
documentSchema.index({ category: 1, subcategory: 1 });
documentSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Document', documentSchema);
```

#### authController.js - Authentication Controller
```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const UserRole = require('../models/UserRole');

// Generate JWT Token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'Email already registered'
      });
    }

    // Create user
    const user = await User.create({ email, password, name });

    // Assign default role
    await UserRole.create({ userId: user._id, role: 'user' });

    // Generate token
    const token = signToken(user._id);

    res.status(201).json({
      success: true,
      data: {
        user: {
          _id: user._id,
          email: user.email,
          name: user.name
        },
        token
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email and password'
      });
    }

    // Find user with password
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Generate token
    const token = signToken(user._id);

    res.json({
      success: true,
      data: {
        user: {
          _id: user._id,
          email: user.email,
          name: user.name
        },
        token
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const userRole = await UserRole.findOne({ userId: req.user.id });

    res.json({
      success: true,
      data: {
        user: {
          _id: user._id,
          email: user.email,
          name: user.name
        },
        role: userRole?.role || 'user'
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
exports.logout = async (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
};
```

#### auth.js - Auth Middleware
```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this route'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'User no longer exists'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this route'
    });
  }
};
```

---

## 12. Screenshots

### 12.1 Landing Page
*[Insert Screenshot: Landing page showing the welcome section, feature highlights, and login/register buttons]*

**Description:** The landing page welcomes visitors with the TNPSC Wizard branding, a brief introduction to the platform, and prominent call-to-action buttons for registration and login.

### 12.2 User Registration
*[Insert Screenshot: Registration form with name, email, and password fields]*

**Description:** The registration page allows new users to create an account by providing their name, email address, and password.

### 12.3 User Login
*[Insert Screenshot: Login form with email and password fields]*

**Description:** Existing users can log in using their registered email and password through this interface.

### 12.4 User Dashboard
*[Insert Screenshot: Main dashboard showing all feature cards in a grid layout]*

**Description:** The authenticated user dashboard displays quick access cards for all features including Syllabus, Previous Papers, Books, Notes, Quiz, Tirukural, Tamil Scholars, and AI Assistant.

### 12.5 Syllabus Page
*[Insert Screenshot: Syllabus selection page showing Group 1, 2, 2A, and 4 options]*

**Description:** Users can select their target exam group to view the corresponding syllabus document.

### 12.6 Syllabus Viewer
*[Insert Screenshot: PDF viewer showing syllabus content]*

**Description:** The integrated PDF viewer allows users to read syllabus documents directly in the browser with zoom, navigation, and download options.

### 12.7 Previous Papers
*[Insert Screenshot: Previous papers listing organized by year and group]*

**Description:** The previous papers section organizes question papers by year and exam group for easy navigation.

### 12.8 School Books
*[Insert Screenshot: Standard selection showing classes 6-12]*

**Description:** Users can select their required standard to access relevant textbooks.

### 12.9 Books List
*[Insert Screenshot: Subject-wise book listing for a selected standard]*

**Description:** Subject-wise books are displayed for the selected standard with download options.

### 12.10 Study Notes
*[Insert Screenshot: Notes listing organized by subject]*

**Description:** Curated study notes are organized by subject for quick revision.

### 12.11 Tirukural Section
*[Insert Screenshot: Tirukural interface showing chapters and verses]*

**Description:** The Tirukural section presents the complete 1330 kurals organized by Adhikaram with Tamil text and English translations.

### 12.12 Tamil Scholars
*[Insert Screenshot: Tamil poets/scholars listing with images and bios]*

**Description:** Information about famous Tamil poets and scholars including Bharathiyar, Bharathidasan, and others.

### 12.13 Quiz Selection
*[Insert Screenshot: Quiz category selection page]*

**Description:** Users can choose from Tamil, General Studies, or Mathematics quizzes.

### 12.14 Quiz Interface
*[Insert Screenshot: Quiz question with multiple choice options]*

**Description:** The quiz interface presents questions with multiple choice options, timer, and navigation controls.

### 12.15 Quiz Results
*[Insert Screenshot: Quiz results showing score and performance analysis]*

**Description:** After completing a quiz, users see their score, correct/wrong answers, and performance metrics.

### 12.16 AI Assistant
*[Insert Screenshot: TNPSC Wizard AI chat interface]*

**Description:** The AI assistant provides study guidance through a chat interface.

### 12.17 Admin Dashboard
*[Insert Screenshot: Admin panel overview with statistics]*

**Description:** Administrators can view platform statistics including user counts, document counts, and download metrics.

### 12.18 Admin - Document Management
*[Insert Screenshot: Admin file manager showing document list with actions]*

**Description:** Admins can upload, edit, and delete documents through this interface.

### 12.19 Admin - Document Upload
*[Insert Screenshot: Document upload form with category selection]*

**Description:** The document upload form allows admins to add new materials with metadata.

### 12.20 Admin - Image Management
*[Insert Screenshot: Admin image gallery with upload and delete options]*

**Description:** Admins can manage platform images including poet photos, book covers, and logos.

### 12.21 Mobile Responsive - Landing
*[Insert Screenshot: Landing page on mobile device]*

**Description:** The landing page adapts seamlessly to mobile screens.

### 12.22 Mobile Responsive - Dashboard
*[Insert Screenshot: Dashboard on mobile device]*

**Description:** The dashboard provides full functionality on mobile with touch-optimized navigation.

### 12.23 Mobile Responsive - Navigation
*[Insert Screenshot: Mobile menu drawer]*

**Description:** Mobile navigation uses a drawer menu for easy access to all features.

### 12.24 Dark Mode
*[Insert Screenshot: Dashboard in dark mode]*

**Description:** The platform supports dark mode for comfortable viewing in low-light conditions.

---

## 13. Book References

### 13.1 Web Development

1. **Flanagan, David.** (2020). *JavaScript: The Definitive Guide*, 7th Edition. O'Reilly Media.
   - ISBN: 978-1491952023

2. **Duckett, Jon.** (2014). *HTML and CSS: Design and Build Websites*. Wiley.
   - ISBN: 978-1118008188

3. **Banks, Alex & Porcello, Eve.** (2020). *Learning React*, 2nd Edition. O'Reilly Media.
   - ISBN: 978-1492051725

4. **Wieruch, Robin.** (2023). *The Road to React*. Self-published.
   - Available at: https://www.roadtoreact.com/

5. **Tailwind Labs.** (2024). *Tailwind CSS Documentation*.
   - Available at: https://tailwindcss.com/docs

### 13.2 Node.js and Backend

6. **Herron, David.** (2020). *Node.js Web Development*, 5th Edition. Packt Publishing.
   - ISBN: 978-1838987572

7. **Brown, Ethan.** (2019). *Web Development with Node and Express*, 2nd Edition. O'Reilly Media.
   - ISBN: 978-1492053514

8. **Subramanian, Vasan.** (2019). *Pro MERN Stack*, 2nd Edition. Apress.
   - ISBN: 978-1484243909

### 13.3 MongoDB and Database

9. **Bradshaw, Shannon, et al.** (2019). *MongoDB: The Definitive Guide*, 3rd Edition. O'Reilly Media.
   - ISBN: 978-1491954461

10. **Chodorow, Kristina.** (2013). *MongoDB: The Definitive Guide*, 2nd Edition. O'Reilly Media.
    - ISBN: 978-1449344689

### 13.4 TypeScript

11. **Cherny, Boris.** (2019). *Programming TypeScript*. O'Reilly Media.
    - ISBN: 978-1492037651

12. **Microsoft.** (2024). *TypeScript Handbook*.
    - Available at: https://www.typescriptlang.org/docs/handbook/

### 13.5 Software Engineering

13. **Sommerville, Ian.** (2015). *Software Engineering*, 10th Edition. Pearson.
    - ISBN: 978-0133943030

14. **Pressman, Roger S.** (2014). *Software Engineering: A Practitioner's Approach*, 8th Edition. McGraw-Hill.
    - ISBN: 978-0078022128

### 13.6 UI/UX Design

15. **Krug, Steve.** (2014). *Don't Make Me Think, Revisited*, 3rd Edition. New Riders.
    - ISBN: 978-0321965516

16. **Norman, Don.** (2013). *The Design of Everyday Things*, Revised Edition. Basic Books.
    - ISBN: 978-0465050659

### 13.7 Authentication and Security

17. **OWASP Foundation.** (2024). *OWASP Top Ten Web Application Security Risks*.
    - Available at: https://owasp.org/www-project-top-ten/

18. **Jones, M., Bradley, J., & Sakimura, N.** (2015). *JSON Web Token (JWT) - RFC 7519*. IETF.
    - Available at: https://tools.ietf.org/html/rfc7519

### 13.8 TNPSC Related

19. **Tamil Nadu Public Service Commission.** (2024). *Official Syllabus and Notifications*.
    - Available at: https://www.tnpsc.gov.in/

20. **Government of Tamil Nadu.** (2024). *Tamil Nadu State Board Textbooks*.
    - Available at: https://textbooksonline.tn.nic.in/

### 13.9 Online Resources

21. **React Official Documentation** - https://react.dev/
22. **Node.js Official Documentation** - https://nodejs.org/docs/
23. **MongoDB Official Documentation** - https://www.mongodb.com/docs/
24. **MDN Web Docs** - https://developer.mozilla.org/
25. **Stack Overflow** - https://stackoverflow.com/

---

## Appendix A: Glossary

| Term | Definition |
|------|------------|
| API | Application Programming Interface |
| CRUD | Create, Read, Update, Delete operations |
| CSS | Cascading Style Sheets |
| DOM | Document Object Model |
| HTML | HyperText Markup Language |
| HTTP | HyperText Transfer Protocol |
| JSON | JavaScript Object Notation |
| JWT | JSON Web Token |
| MongoDB | NoSQL document database |
| Node.js | JavaScript runtime for server-side |
| ODM | Object Document Mapper |
| React | JavaScript library for building UIs |
| REST | Representational State Transfer |
| RLS | Row Level Security |
| SPA | Single Page Application |
| SQL | Structured Query Language |
| TNPSC | Tamil Nadu Public Service Commission |
| TypeScript | Typed superset of JavaScript |
| UI | User Interface |
| URL | Uniform Resource Locator |
| UX | User Experience |

---

## Appendix B: Installation Guide

### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/tnpsc-wizard.git
cd tnpsc-wizard
```

### Step 2: Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### Step 3: Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with MongoDB URI and JWT secret
npm run dev
```

### Step 4: Database Setup
1. Create MongoDB Atlas account or install MongoDB locally
2. Create database named `tnpsc-wizard`
3. Update `MONGODB_URI` in backend `.env`

### Step 5: Access Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

---

**End of Project Report**

---

*This report is submitted in partial fulfillment of the requirements for [Your Degree/Course Name].*

*Date: [Submission Date]*

*Signature: ________________________*
