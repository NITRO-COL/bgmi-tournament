# BGMI Tournament App

A Next.js application for managing BGMI tournament registrations with MongoDB backend.

## Features

- Team registration form with validation
- MongoDB integration for data storage
- Team listing page
- Admin authentication and dashboard
- Responsive design with Tailwind CSS

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up MongoDB:
   - Install MongoDB locally or use a cloud service like MongoDB Atlas
   - Create a `.env.local` file in the root directory with your MongoDB connection string:
     ```
     MONGODB_URI=your_mongodb_connection_string_here
     ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
  ├── app/                 # Next.js app directory
  │   ├── api/             # API routes
  │   ├── admin/           # Admin pages
  │   ├── teams/           # Teams page
  │   ├── page.tsx         # Home page
  │   └── layout.tsx       # Root layout
  ├── components/          # React components
  ├── lib/                 # Utility functions
  └── models/              # Mongoose models
```

## API Endpoints

- `POST /api/register` - Register a new team
- `GET /api/register` - Get all registered teams
- `POST /api/admin/login` - Admin authentication

## Admin Access

- Visit [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- Use demo credentials: `admin@example.com` / `admin123`
- View registered teams and tournament statistics

## Environment Variables

- `MONGODB_URI` - MongoDB connection string

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)

## Deploy

The easiest way to deploy your Next.js app is to use [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).