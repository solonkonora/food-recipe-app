# Authentication Setup Guide

## Overview
The app now uses a custom backend authentication system (tasty-api) instead of Firebase. Each user has their own private recipe collection.

## Backend Setup (tasty-api)

### 1. Database Migrations
Run the auth schema to create the necessary tables:

```bash
cd /home/nkwada/Documents/LocalBite/tasty-api
psql -U your_username -d your_database_name -f db_config/auth-schema.sql
```

This creates:
- `users` table (id, email, password_hash, full_name, timestamps)
- `favorites` table (user_id, recipe_id)
- Adds `user_id` column to `recipes` table

### 2. Environment Variables
Create a `.env` file in `tasty-api/` with:

```env
JWT_SECRET=your-super-secret-jwt-key-change-this
NODE_ENV=development
PORT=3000
# Your existing database config...
```

### 3. Start the Backend
```bash
cd /home/nkwada/Documents/LocalBite/tasty-api
npm run dev
```

Server runs on `http://localhost:3000`

## Frontend Setup (food-recipe-app)

### 1. Environment Variables (Optional)
Create `.env` in `food-recipe-app/` to customize API URL:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

Default is `http://localhost:3000/api` if not set.

### 2. Start the Frontend
```bash
cd /home/nkwada/Documents/LocalBite/food-recipe-app
npm run dev
```

Frontend runs on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Recipes (Protected)
- `GET /api/recipes` - Get user's recipes
- `GET /api/recipes/:id` - Get single recipe
- `POST /api/recipes` - Create recipe
- `PUT /api/recipes/:id` - Update recipe
- `DELETE /api/recipes/:id` - Delete recipe

### Favorites (Protected)
- `GET /api/favorites` - Get user's favorites
- `POST /api/favorites/:recipeId` - Add to favorites
- `DELETE /api/favorites/:recipeId` - Remove from favorites
- `GET /api/favorites/check/:recipeId` - Check favorite status

## Features Implemented

✅ User signup and login
✅ JWT-based authentication (HttpOnly cookies + header fallback)
✅ Protected routes - only logged-in users can access recipes
✅ User-specific recipe collections
✅ Per-user favorites (persisted in backend)
✅ Recipe CRUD operations
✅ Real-time search (client-side filtering)

## How It Works

1. **Authentication Flow:**
   - User signs up or logs in
   - Backend generates JWT token
   - Token stored in HttpOnly cookie (secure)
   - Token also returned in response (for header-based auth)
   - Frontend checks auth status on mount

2. **Recipe Access:**
   - All recipe endpoints require authentication
   - Users can only see/edit/delete their own recipes
   - Recipes are linked to user via `user_id` column

3. **Favorites:**
   - Favorites stored in backend `favorites` table
   - Each user can favorite any of their recipes
   - Favorite status persisted across sessions

## Next Steps

- Add recipe creation form UI
- Add recipe edit functionality
- Add image upload for recipes
- Add recipe categories management
- Add ingredients and instructions management
- Improve error handling and loading states
- Add password reset functionality
- Add user profile management
