# TNPSC Guide - Export & MongoDB Migration Guide

## Quick Export Steps

1. **Export from Lovable**
   - Go to Settings → Export
   - Download the project ZIP
   - Extract to your local machine

2. **Set up Git (if not already)**
   ```bash
   cd tnpsc-guide
   git init
   git add .
   git commit -m "Initial export from Lovable"
   ```

3. **Create Backend Folder**
   ```bash
   mkdir backend
   cd backend
   npm init -y
   ```

4. **Enable MongoDB Mode**
   - Edit `src/services/api/config.ts`
   - Set `USE_MONGODB_BACKEND = true`
   - Update `MONGODB_API_URL` with your backend URL

## Current Features to Migrate

| Feature | Frontend Location | Backend Endpoint Needed |
|---------|-------------------|------------------------|
| User Auth | `useAuth.tsx` | `/api/auth/*` |
| Documents | `useDocuments.tsx` | `/api/documents/*` |
| Images | `useImages.tsx` | `/api/images/*` |
| Admin Panel | `Admin.tsx` | All admin endpoints |

## Existing API Abstraction

The following service files are ready for MongoDB:

- `src/services/api/authService.ts` - Authentication
- `src/services/api/documentService.ts` - Document CRUD
- `src/services/api/imageService.ts` - Image CRUD
- `src/services/api/types.ts` - TypeScript types
- `src/services/api/config.ts` - Configuration toggle

## What You Need to Build

### Required Backend Routes

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me

GET    /api/documents
GET    /api/documents/category/:category
POST   /api/documents
PATCH  /api/documents/:id
DELETE /api/documents/:id

GET    /api/images
GET    /api/images/category/:category
POST   /api/images/upload
DELETE /api/images/:id

GET    /api/users/roles/:userId
```

### Required MongoDB Collections

1. `users` - User accounts
2. `userRoles` - Admin/user roles
3. `documents` - PDF files metadata
4. `images` - Image metadata

See `BACKEND_SETUP.md` for detailed schemas and code examples.

## Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tnpsc-guide
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:5173
```

## Testing After Migration

1. Start MongoDB locally or use Atlas
2. Start backend: `npm run dev`
3. Start frontend: `npm run dev`
4. Test login/register
5. Test document upload (admin)
6. Test image upload (admin)
